import {
  users,
  bibleBooks,
  bibleVerses,
  bookmarks,
  highlights,
  readingProgress,
  dailyVerses,
  prayerRequests,
  type User,
  type UpsertUser,
  type BibleBook,
  type BibleVerse,
  type Bookmark,
  type InsertBookmark,
  type Highlight,
  type InsertHighlight,
  type ReadingProgress,
  type InsertReadingProgress,
  type DailyVerse,
  type PrayerRequest,
  type InsertPrayerRequest,
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc, like, or } from "drizzle-orm";

// Interface for storage operations
export interface IStorage {
  // User operations (IMPORTANT) these user operations are mandatory for Replit Auth.
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  updateUserPreferences(userId: string, preferences: { language?: string; theme?: string; fontSize?: number }): Promise<User>;
  
  // Bible operations
  getBibleBooks(): Promise<BibleBook[]>;
  getBibleBook(id: number): Promise<BibleBook | undefined>;
  getBibleVerses(bookId: number, chapter: number): Promise<BibleVerse[]>;
  searchVerses(query: string, language?: string): Promise<BibleVerse[]>;
  
  // Bookmark operations
  getUserBookmarks(userId: string): Promise<(Bookmark & { book: BibleBook; verseText: string })[]>;
  createBookmark(bookmark: InsertBookmark): Promise<Bookmark>;
  deleteBookmark(id: string, userId: string): Promise<void>;
  
  // Highlight operations
  getUserHighlights(userId: string, bookId?: number, chapter?: number): Promise<Highlight[]>;
  createHighlight(highlight: InsertHighlight): Promise<Highlight>;
  deleteHighlight(id: string, userId: string): Promise<void>;
  
  // Reading progress operations
  getUserReadingProgress(userId: string): Promise<ReadingProgress[]>;
  markChapterComplete(progress: InsertReadingProgress): Promise<ReadingProgress>;
  
  // Daily verse operations
  getDailyVerse(date: string): Promise<(DailyVerse & { book: BibleBook; verseText: string }) | undefined>;
  
  // Prayer request operations
  getUserPrayerRequests(userId: string): Promise<PrayerRequest[]>;
  createPrayerRequest(request: InsertPrayerRequest): Promise<PrayerRequest>;
  updatePrayerRequest(id: string, userId: string, updates: { isAnswered?: boolean }): Promise<PrayerRequest>;
}

export class DatabaseStorage implements IStorage {
  // User operations (IMPORTANT) these user operations are mandatory for Replit Auth.
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  async updateUserPreferences(userId: string, preferences: { language?: string; theme?: string; fontSize?: number }): Promise<User> {
    const [user] = await db
      .update(users)
      .set({ ...preferences, updatedAt: new Date() })
      .where(eq(users.id, userId))
      .returning();
    return user;
  }

  // Bible operations
  async getBibleBooks(): Promise<BibleBook[]> {
    return await db.select().from(bibleBooks).orderBy(bibleBooks.id);
  }

  async getBibleBook(id: number): Promise<BibleBook | undefined> {
    const [book] = await db.select().from(bibleBooks).where(eq(bibleBooks.id, id));
    return book;
  }

  async getBibleVerses(bookId: number, chapter: number): Promise<BibleVerse[]> {
    return await db
      .select()
      .from(bibleVerses)
      .where(and(eq(bibleVerses.bookId, bookId), eq(bibleVerses.chapter, chapter)))
      .orderBy(bibleVerses.verse);
  }

  async searchVerses(query: string, language = "en"): Promise<BibleVerse[]> {
    const textColumn = language === "tl" ? bibleVerses.textTagalog : bibleVerses.textEnglish;
    return await db
      .select()
      .from(bibleVerses)
      .where(like(textColumn, `%${query}%`))
      .limit(50);
  }

  // Bookmark operations
  async getUserBookmarks(userId: string): Promise<(Bookmark & { book: BibleBook; verseText: string })[]> {
    const result = await db
      .select({
        id: bookmarks.id,
        userId: bookmarks.userId,
        bookId: bookmarks.bookId,
        chapter: bookmarks.chapter,
        verse: bookmarks.verse,
        note: bookmarks.note,
        createdAt: bookmarks.createdAt,
        book: bibleBooks,
        verseText: bibleVerses.textEnglish,
      })
      .from(bookmarks)
      .innerJoin(bibleBooks, eq(bookmarks.bookId, bibleBooks.id))
      .innerJoin(
        bibleVerses,
        and(
          eq(bibleVerses.bookId, bookmarks.bookId),
          eq(bibleVerses.chapter, bookmarks.chapter),
          eq(bibleVerses.verse, bookmarks.verse)
        )
      )
      .where(eq(bookmarks.userId, userId))
      .orderBy(desc(bookmarks.createdAt));
    
    return result.map(row => ({
      id: row.id,
      userId: row.userId,
      bookId: row.bookId,
      chapter: row.chapter,
      verse: row.verse,
      note: row.note,
      createdAt: row.createdAt,
      book: row.book,
      verseText: row.verseText,
    }));
  }

  async createBookmark(bookmark: InsertBookmark): Promise<Bookmark> {
    const [newBookmark] = await db.insert(bookmarks).values(bookmark).returning();
    return newBookmark;
  }

  async deleteBookmark(id: string, userId: string): Promise<void> {
    await db.delete(bookmarks).where(and(eq(bookmarks.id, id), eq(bookmarks.userId, userId)));
  }

  // Highlight operations
  async getUserHighlights(userId: string, bookId?: number, chapter?: number): Promise<Highlight[]> {
    if (bookId && chapter) {
      return await db
        .select()
        .from(highlights)
        .where(
          and(
            eq(highlights.userId, userId),
            eq(highlights.bookId, bookId),
            eq(highlights.chapter, chapter)
          )
        )
        .orderBy(highlights.verse);
    }
    
    return await db
      .select()
      .from(highlights)
      .where(eq(highlights.userId, userId))
      .orderBy(highlights.verse);
  }

  async createHighlight(highlight: InsertHighlight): Promise<Highlight> {
    const [newHighlight] = await db.insert(highlights).values(highlight).returning();
    return newHighlight;
  }

  async deleteHighlight(id: string, userId: string): Promise<void> {
    await db.delete(highlights).where(and(eq(highlights.id, id), eq(highlights.userId, userId)));
  }

  // Reading progress operations
  async getUserReadingProgress(userId: string): Promise<ReadingProgress[]> {
    return await db
      .select()
      .from(readingProgress)
      .where(eq(readingProgress.userId, userId))
      .orderBy(desc(readingProgress.completedAt));
  }

  async markChapterComplete(progress: InsertReadingProgress): Promise<ReadingProgress> {
    // Check if already exists
    const existing = await db
      .select()
      .from(readingProgress)
      .where(
        and(
          eq(readingProgress.userId, progress.userId),
          eq(readingProgress.bookId, progress.bookId),
          eq(readingProgress.chapter, progress.chapter)
        )
      );

    if (existing.length > 0) {
      return existing[0];
    }

    const [newProgress] = await db.insert(readingProgress).values(progress).returning();
    return newProgress;
  }

  // Daily verse operations
  async getDailyVerse(date: string): Promise<(DailyVerse & { book: BibleBook; verseText: string }) | undefined> {
    const result = await db
      .select({
        id: dailyVerses.id,
        date: dailyVerses.date,
        bookId: dailyVerses.bookId,
        chapter: dailyVerses.chapter,
        verse: dailyVerses.verse,
        explanation: dailyVerses.explanation,
        book: bibleBooks,
        verseText: bibleVerses.textEnglish,
      })
      .from(dailyVerses)
      .innerJoin(bibleBooks, eq(dailyVerses.bookId, bibleBooks.id))
      .innerJoin(
        bibleVerses,
        and(
          eq(bibleVerses.bookId, dailyVerses.bookId),
          eq(bibleVerses.chapter, dailyVerses.chapter),
          eq(bibleVerses.verse, dailyVerses.verse)
        )
      )
      .where(eq(dailyVerses.date, date));

    if (result.length === 0) return undefined;

    const row = result[0];
    return {
      id: row.id,
      date: row.date,
      bookId: row.bookId,
      chapter: row.chapter,
      verse: row.verse,
      explanation: row.explanation,
      book: row.book,
      verseText: row.verseText,
    };
  }

  // Prayer request operations
  async getUserPrayerRequests(userId: string): Promise<PrayerRequest[]> {
    return await db
      .select()
      .from(prayerRequests)
      .where(eq(prayerRequests.userId, userId))
      .orderBy(desc(prayerRequests.createdAt));
  }

  async createPrayerRequest(request: InsertPrayerRequest): Promise<PrayerRequest> {
    const [newRequest] = await db.insert(prayerRequests).values(request).returning();
    return newRequest;
  }

  async updatePrayerRequest(id: string, userId: string, updates: { isAnswered?: boolean }): Promise<PrayerRequest> {
    const updateData: any = { ...updates };
    if (updates.isAnswered) {
      updateData.answeredAt = new Date();
    }

    const [updatedRequest] = await db
      .update(prayerRequests)
      .set(updateData)
      .where(and(eq(prayerRequests.id, id), eq(prayerRequests.userId, userId)))
      .returning();
    return updatedRequest;
  }
}

export const storage = new DatabaseStorage();
