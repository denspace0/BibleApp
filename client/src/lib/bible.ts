import type { BibleBook, BibleVerse } from "@shared/schema";

// Bible book data for initialization
export const BIBLE_BOOKS: Omit<BibleBook, "id">[] = [
  // Old Testament
  { name: "Genesis", nameTagalog: "Genesis", testament: "old", chapters: 50 },
  { name: "Exodus", nameTagalog: "Exodo", testament: "old", chapters: 40 },
  { name: "Leviticus", nameTagalog: "Levitico", testament: "old", chapters: 27 },
  { name: "Numbers", nameTagalog: "Mga Bilang", testament: "old", chapters: 36 },
  { name: "Deuteronomy", nameTagalog: "Deuteronomio", testament: "old", chapters: 34 },
  { name: "Joshua", nameTagalog: "Josue", testament: "old", chapters: 24 },
  { name: "Judges", nameTagalog: "Mga Hukom", testament: "old", chapters: 21 },
  { name: "Ruth", nameTagalog: "Ruth", testament: "old", chapters: 4 },
  { name: "1 Samuel", nameTagalog: "1 Samuel", testament: "old", chapters: 31 },
  { name: "2 Samuel", nameTagalog: "2 Samuel", testament: "old", chapters: 24 },
  { name: "1 Kings", nameTagalog: "1 Mga Hari", testament: "old", chapters: 22 },
  { name: "2 Kings", nameTagalog: "2 Mga Hari", testament: "old", chapters: 25 },
  { name: "1 Chronicles", nameTagalog: "1 Mga Cronica", testament: "old", chapters: 29 },
  { name: "2 Chronicles", nameTagalog: "2 Mga Cronica", testament: "old", chapters: 36 },
  { name: "Ezra", nameTagalog: "Ezra", testament: "old", chapters: 10 },
  { name: "Nehemiah", nameTagalog: "Nehemias", testament: "old", chapters: 13 },
  { name: "Esther", nameTagalog: "Ester", testament: "old", chapters: 10 },
  { name: "Job", nameTagalog: "Job", testament: "old", chapters: 42 },
  { name: "Psalms", nameTagalog: "Mga Awit", testament: "old", chapters: 150 },
  { name: "Proverbs", nameTagalog: "Mga Kawikaan", testament: "old", chapters: 31 },
  { name: "Ecclesiastes", nameTagalog: "Mangangaral", testament: "old", chapters: 12 },
  { name: "Song of Solomon", nameTagalog: "Awit ni Solomon", testament: "old", chapters: 8 },
  { name: "Isaiah", nameTagalog: "Isaias", testament: "old", chapters: 66 },
  { name: "Jeremiah", nameTagalog: "Jeremias", testament: "old", chapters: 52 },
  { name: "Lamentations", nameTagalog: "Mga Panaghoy", testament: "old", chapters: 5 },
  { name: "Ezekiel", nameTagalog: "Ezekiel", testament: "old", chapters: 48 },
  { name: "Daniel", nameTagalog: "Daniel", testament: "old", chapters: 12 },
  { name: "Hosea", nameTagalog: "Oseas", testament: "old", chapters: 14 },
  { name: "Joel", nameTagalog: "Joel", testament: "old", chapters: 3 },
  { name: "Amos", nameTagalog: "Amos", testament: "old", chapters: 9 },
  { name: "Obadiah", nameTagalog: "Obadias", testament: "old", chapters: 1 },
  { name: "Jonah", nameTagalog: "Jonas", testament: "old", chapters: 4 },
  { name: "Micah", nameTagalog: "Miqueas", testament: "old", chapters: 7 },
  { name: "Nahum", nameTagalog: "Nahum", testament: "old", chapters: 3 },
  { name: "Habakkuk", nameTagalog: "Habacuc", testament: "old", chapters: 3 },
  { name: "Zephaniah", nameTagalog: "Sofonias", testament: "old", chapters: 3 },
  { name: "Haggai", nameTagalog: "Hageo", testament: "old", chapters: 2 },
  { name: "Zechariah", nameTagalog: "Zacarias", testament: "old", chapters: 14 },
  { name: "Malachi", nameTagalog: "Malaquias", testament: "old", chapters: 4 },
  
  // New Testament
  { name: "Matthew", nameTagalog: "Mateo", testament: "new", chapters: 28 },
  { name: "Mark", nameTagalog: "Marcos", testament: "new", chapters: 16 },
  { name: "Luke", nameTagalog: "Lucas", testament: "new", chapters: 24 },
  { name: "John", nameTagalog: "Juan", testament: "new", chapters: 21 },
  { name: "Acts", nameTagalog: "Mga Gawa", testament: "new", chapters: 28 },
  { name: "Romans", nameTagalog: "Mga Taga-Roma", testament: "new", chapters: 16 },
  { name: "1 Corinthians", nameTagalog: "1 Mga Taga-Corinto", testament: "new", chapters: 16 },
  { name: "2 Corinthians", nameTagalog: "2 Mga Taga-Corinto", testament: "new", chapters: 13 },
  { name: "Galatians", nameTagalog: "Mga Taga-Galacia", testament: "new", chapters: 6 },
  { name: "Ephesians", nameTagalog: "Mga Taga-Efeso", testament: "new", chapters: 6 },
  { name: "Philippians", nameTagalog: "Mga Taga-Filipos", testament: "new", chapters: 4 },
  { name: "Colossians", nameTagalog: "Mga Taga-Colosas", testament: "new", chapters: 4 },
  { name: "1 Thessalonians", nameTagalog: "1 Mga Taga-Tesalonica", testament: "new", chapters: 5 },
  { name: "2 Thessalonians", nameTagalog: "2 Mga Taga-Tesalonica", testament: "new", chapters: 3 },
  { name: "1 Timothy", nameTagalog: "1 Timoteo", testament: "new", chapters: 6 },
  { name: "2 Timothy", nameTagalog: "2 Timoteo", testament: "new", chapters: 4 },
  { name: "Titus", nameTagalog: "Tito", testament: "new", chapters: 3 },
  { name: "Philemon", nameTagalog: "Filemon", testament: "new", chapters: 1 },
  { name: "Hebrews", nameTagalog: "Mga Hebreo", testament: "new", chapters: 13 },
  { name: "James", nameTagalog: "Santiago", testament: "new", chapters: 5 },
  { name: "1 Peter", nameTagalog: "1 Pedro", testament: "new", chapters: 5 },
  { name: "2 Peter", nameTagalog: "2 Pedro", testament: "new", chapters: 3 },
  { name: "1 John", nameTagalog: "1 Juan", testament: "new", chapters: 5 },
  { name: "2 John", nameTagalog: "2 Juan", testament: "new", chapters: 1 },
  { name: "3 John", nameTagalog: "3 Juan", testament: "new", chapters: 1 },
  { name: "Jude", nameTagalog: "Judas", testament: "new", chapters: 1 },
  { name: "Revelation", nameTagalog: "Pahayag", testament: "new", chapters: 22 },
];

// Sample verses for Genesis 1 (for initial seeding)
export const GENESIS_1_VERSES = [
  {
    bookId: 1,
    chapter: 1,
    verse: 1,
    textEnglish: "In the beginning, God created the heavens and the earth.",
    textTagalog: "Nang pasimula ay nilikha ng Dios ang langit at ang lupa.",
    translation: "ESV"
  },
  {
    bookId: 1,
    chapter: 1,
    verse: 2,
    textEnglish: "The earth was without form and void, and darkness was over the face of the deep. And the Spirit of God was hovering over the face of the waters.",
    textTagalog: "Ang lupa ay walang hugis at walang laman, at kadiliman ang nasa ibabaw ng kailaliman. At ang Espiritu ng Dios ay umiikot sa ibabaw ng mga tubig.",
    translation: "ESV"
  },
  {
    bookId: 1,
    chapter: 1,
    verse: 3,
    textEnglish: "And God said, \"Let there be light,\" and there was light.",
    textTagalog: "At sinabi ng Dios, \"Magkaroon ng liwanag,\" at nagkaroon ng liwanag.",
    translation: "ESV"
  },
  {
    bookId: 1,
    chapter: 1,
    verse: 4,
    textEnglish: "And God saw that the light was good. And God separated the light from the darkness.",
    textTagalog: "At nakita ng Dios na ang liwanag ay mabuti. At inihiwalay ng Dios ang liwanag sa kadiliman.",
    translation: "ESV"
  },
  {
    bookId: 1,
    chapter: 1,
    verse: 5,
    textEnglish: "God called the light Day, and the darkness he called Night. And there was evening and there was morning, the first day.",
    textTagalog: "Tinawag ng Dios ang liwanag na Araw, at ang kadiliman ay tinawag niyang Gabi. At nagkaroon ng gabi at nagkaroon ng umaga, ang unang araw.",
    translation: "ESV"
  },
  // Add more verses for a complete chapter...
  {
    bookId: 1,
    chapter: 1,
    verse: 6,
    textEnglish: "And God said, \"Let there be an expanse in the midst of the waters, and let it separate the waters from the waters.\"",
    textTagalog: "At sinabi ng Dios, \"Magkaroon ng kalawakan sa gitna ng mga tubig, at ito ay maghiwalay sa mga tubig sa mga tubig.\"",
    translation: "ESV"
  },
  {
    bookId: 1,
    chapter: 1,
    verse: 7,
    textEnglish: "And God made the expanse and separated the waters that were under the expanse from the waters that were above the expanse. And it was so.",
    textTagalog: "At ginawa ng Dios ang kalawakan at inihiwalay ang mga tubig na nasa ilalim ng kalawakan sa mga tubig na nasa itaas ng kalawakan. At naging ganoon.",
    translation: "ESV"
  },
  {
    bookId: 1,
    chapter: 1,
    verse: 8,
    textEnglish: "And God called the expanse Heaven. And there was evening and there was morning, the second day.",
    textTagalog: "At tinawag ng Dios ang kalawakan na Langit. At nagkaroon ng gabi at nagkaroon ng umaga, ang ikalawang araw.",
    translation: "ESV"
  }
];

// Daily verses for seeding
export const DAILY_VERSES_SEED = [
  {
    date: new Date().toISOString().split('T')[0], // Today
    bookId: 24, // Jeremiah
    chapter: 29,
    verse: 11,
    explanation: "This verse reminds us that God has good plans for our lives, plans that give us hope and a future. Even in difficult times, we can trust in God's perfect timing and His love for us."
  },
  {
    date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Tomorrow
    bookId: 40, // Matthew
    chapter: 5,
    verse: 16,
    explanation: "We are called to be lights in this world, letting our good works shine so that others may see God's love through us and give glory to our Father in heaven."
  }
];

// Utility functions for Bible navigation
export function getBookName(bookId: number, language: 'en' | 'tl' = 'en'): string {
  const book = BIBLE_BOOKS.find((_, index) => index + 1 === bookId);
  if (!book) return `Book ${bookId}`;
  return language === 'tl' && book.nameTagalog ? book.nameTagalog : book.name;
}

export function getTestament(bookId: number): 'old' | 'new' | null {
  const book = BIBLE_BOOKS.find((_, index) => index + 1 === bookId);
  return book?.testament || null;
}

export function getChapterCount(bookId: number): number {
  const book = BIBLE_BOOKS.find((_, index) => index + 1 === bookId);
  return book?.chapters || 0;
}

export function formatVerseReference(bookId: number, chapter: number, verse: number, language: 'en' | 'tl' = 'en'): string {
  const bookName = getBookName(bookId, language);
  return `${bookName} ${chapter}:${verse}`;
}

export function isValidBookChapter(bookId: number, chapter: number): boolean {
  const chapterCount = getChapterCount(bookId);
  return chapter >= 1 && chapter <= chapterCount;
}
