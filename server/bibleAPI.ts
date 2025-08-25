// Bible API service to fetch verses and commentary from external sources
import type { BibleVerse } from "@shared/schema";

interface BollsLifeResponse {
  text: string;
  comment?: string;
  translation_id: string;
  translation_name: string;
  book_name: string;
  chapter: number;
  verse: number;
}

interface APIBibleResponse {
  data: {
    id: string;
    orgId: string;
    content: string;
    reference: string;
    verseCount: number;
    copyright: string;
  };
}

export class BibleAPIService {
  private static readonly BOLLS_API_BASE = 'https://bolls.life';
  private static readonly API_BIBLE_BASE = 'https://api.scripture.api.bible/v1';
  private static readonly API_BIBLE_KEY = process.env.API_BIBLE_KEY;

  // Get verse with commentary from Bolls Life API
  static async getVerseWithCommentary(bookName: string, chapter: number, verse: number, translation: string = 'ESV'): Promise<BibleVerse & { commentary?: string }> {
    try {
      const response = await fetch(`${this.BOLLS_API_BASE}/get-text/${translation}/${bookName}/${chapter}/${verse}`);
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data: BollsLifeResponse = await response.json();
      
      return {
        id: `${bookName}-${chapter}-${verse}`,
        bookId: this.getBookIdFromName(bookName),
        chapter,
        verse,
        textEnglish: data.text,
        textTagalog: '', // Will be populated separately if needed
        translation: data.translation_name,
        commentary: data.comment ? this.stripHtmlTags(data.comment) : undefined
      };
    } catch (error) {
      console.error('Error fetching verse from Bolls API:', error);
      throw error;
    }
  }

  // Get chapter verses with commentary
  static async getChapterWithCommentary(bookName: string, chapter: number, translation: string = 'ESV'): Promise<(BibleVerse & { commentary?: string })[]> {
    try {
      const response = await fetch(`${this.BOLLS_API_BASE}/get-chapter/${translation}/${bookName}/${chapter}`);
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      const verses = Array.isArray(data) ? data : [data];
      
      return verses.map((verseData: any) => ({
        id: `${bookName}-${chapter}-${verseData.verse || verseData.verse_number}`,
        bookId: this.getBookIdFromName(bookName),
        chapter,
        verse: Number(verseData.verse || verseData.verse_number),
        textEnglish: String(verseData.text),
        textTagalog: '',
        translation: translation,
        commentary: verseData.comment ? this.stripHtmlTags(verseData.comment) : undefined
      }));
    } catch (error) {
      console.error('Error fetching chapter from Bolls API:', error);
      throw error;
    }
  }

  // Search verses with context
  static async searchVerses(query: string, translation: string = 'ESV'): Promise<(BibleVerse & { commentary?: string })[]> {
    try {
      const response = await fetch(`${this.BOLLS_API_BASE}/find/${translation}?search=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      const results = Array.isArray(data) ? data : [];
      
      return results.map((result: any) => ({
        id: `${result.book_name}-${result.chapter}-${result.verse}`,
        bookId: this.getBookIdFromName(result.book_name),
        chapter: result.chapter,
        verse: Number(result.verse),
        textEnglish: String(result.text),
        textTagalog: '',
        translation: translation,
        commentary: result.comment ? this.stripHtmlTags(result.comment) : undefined
      }));
    } catch (error) {
      console.error('Error searching verses from Bolls API:', error);
      throw error;
    }
  }

  // Get verse of the day with explanation
  static async getVerseOfTheDay(): Promise<BibleVerse & { commentary?: string }> {
    try {
      // For now, return a popular verse with commentary
      // In production, you might want to cycle through different verses
      const popularVerses = [
        { book: 'John', chapter: 3, verse: 16 },
        { book: 'Romans', chapter: 8, verse: 28 },
        { book: 'Philippians', chapter: 4, verse: 13 },
        { book: 'Psalms', chapter: 23, verse: 1 },
        { book: 'Proverbs', chapter: 3, verse: 5 },
      ];

      const today = new Date();
      const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
      const selectedVerse = popularVerses[dayOfYear % popularVerses.length];

      return await this.getVerseWithCommentary(selectedVerse.book, selectedVerse.chapter, selectedVerse.verse);
    } catch (error) {
      console.error('Error getting verse of the day:', error);
      throw error;
    }
  }

  // Helper function to convert book names to IDs
  private static getBookIdFromName(bookName: string): number {
    const bookMap: { [key: string]: number } = {
      'Genesis': 1, 'Exodus': 2, 'Leviticus': 3, 'Numbers': 4, 'Deuteronomy': 5,
      'Joshua': 6, 'Judges': 7, 'Ruth': 8, '1 Samuel': 9, '2 Samuel': 10,
      '1 Kings': 11, '2 Kings': 12, '1 Chronicles': 13, '2 Chronicles': 14, 'Ezra': 15,
      'Nehemiah': 16, 'Esther': 17, 'Job': 18, 'Psalms': 19, 'Proverbs': 20,
      'Ecclesiastes': 21, 'Song of Solomon': 22, 'Isaiah': 23, 'Jeremiah': 24, 'Lamentations': 25,
      'Ezekiel': 26, 'Daniel': 27, 'Hosea': 28, 'Joel': 29, 'Amos': 30,
      'Obadiah': 31, 'Jonah': 32, 'Micah': 33, 'Nahum': 34, 'Habakkuk': 35,
      'Zephaniah': 36, 'Haggai': 37, 'Zechariah': 38, 'Malachi': 39,
      // New Testament
      'Matthew': 40, 'Mark': 41, 'Luke': 42, 'John': 43, 'Acts': 44,
      'Romans': 45, '1 Corinthians': 46, '2 Corinthians': 47, 'Galatians': 48, 'Ephesians': 49,
      'Philippians': 50, 'Colossians': 51, '1 Thessalonians': 52, '2 Thessalonians': 53, '1 Timothy': 54,
      '2 Timothy': 55, 'Titus': 56, 'Philemon': 57, 'Hebrews': 58, 'James': 59,
      '1 Peter': 60, '2 Peter': 61, '1 John': 62, '2 John': 63, '3 John': 64,
      'Jude': 65, 'Revelation': 66
    };

    return bookMap[bookName] || 1;
  }

  // Helper function to get book name from ID
  static getBookNameFromId(bookId: number): string {
    const books = [
      'Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy',
      'Joshua', 'Judges', 'Ruth', '1 Samuel', '2 Samuel',
      '1 Kings', '2 Kings', '1 Chronicles', '2 Chronicles', 'Ezra',
      'Nehemiah', 'Esther', 'Job', 'Psalms', 'Proverbs',
      'Ecclesiastes', 'Song of Solomon', 'Isaiah', 'Jeremiah', 'Lamentations',
      'Ezekiel', 'Daniel', 'Hosea', 'Joel', 'Amos',
      'Obadiah', 'Jonah', 'Micah', 'Nahum', 'Habakkuk',
      'Zephaniah', 'Haggai', 'Zechariah', 'Malachi',
      'Matthew', 'Mark', 'Luke', 'John', 'Acts',
      'Romans', '1 Corinthians', '2 Corinthians', 'Galatians', 'Ephesians',
      'Philippians', 'Colossians', '1 Thessalonians', '2 Thessalonians', '1 Timothy',
      '2 Timothy', 'Titus', 'Philemon', 'Hebrews', 'James',
      '1 Peter', '2 Peter', '1 John', '2 John', '3 John',
      'Jude', 'Revelation'
    ];

    return books[bookId - 1] || 'Genesis';
  }

  // Strip HTML tags from commentary text
  private static stripHtmlTags(html: string): string {
    return html.replace(/<[^>]*>/g, '').trim();
  }
}