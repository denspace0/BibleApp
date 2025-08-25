export interface BibleBook {
  id: number;
  name: string;
  nameTagalog?: string;
  testament: 'old' | 'new';
  chapters: number;
}

export interface BibleVerse {
  id: string;
  bookId: number;
  chapter: number;
  verse: number;
  textEnglish: string;
  textTagalog?: string;
  translation: string;
}

export interface DailyVerse {
  id: string;
  date: string;
  bookId: number;
  chapter: number;
  verse: number;
  explanation?: string;
  book: BibleBook;
  verseText: string;
}

export interface Bookmark {
  id: string;
  userId: string;
  bookId: number;
  chapter: number;
  verse: number;
  note?: string;
  createdAt: string;
  book: BibleBook;
  verseText: string;
}

export interface Highlight {
  id: string;
  userId: string;
  bookId: number;
  chapter: number;
  verse: number;
  color: string;
  createdAt: string;
}

export interface PrayerRequest {
  id: string;
  userId: string;
  title: string;
  description?: string;
  isPrivate: boolean;
  isAnswered: boolean;
  createdAt: string;
  answeredAt?: string;
}
