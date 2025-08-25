import { sql } from 'drizzle-orm';
import {
  index,
  jsonb,
  pgTable,
  timestamp,
  varchar,
  text,
  integer,
  boolean,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table.
// (IMPORTANT) This table is mandatory for Replit Auth, don't drop it.
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table.
// (IMPORTANT) This table is mandatory for Replit Auth, don't drop it.
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  language: varchar("language").default("en"),
  theme: varchar("theme").default("light"),
  fontSize: integer("font_size").default(18),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Bible books table
export const bibleBooks = pgTable("bible_books", {
  id: integer("id").primaryKey(),
  name: varchar("name").notNull(),
  nameTagalog: varchar("name_tagalog"),
  testament: varchar("testament").notNull(), // "old" or "new"
  chapters: integer("chapters").notNull(),
});

// Bible verses table
export const bibleVerses = pgTable("bible_verses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  bookId: integer("book_id").references(() => bibleBooks.id).notNull(),
  chapter: integer("chapter").notNull(),
  verse: integer("verse").notNull(),
  textEnglish: text("text_english").notNull(),
  textTagalog: text("text_tagalog"),
  translation: varchar("translation").default("ESV"),
  commentary: text("commentary"),
});

// User bookmarks table
export const bookmarks = pgTable("bookmarks", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  bookId: integer("book_id").references(() => bibleBooks.id).notNull(),
  chapter: integer("chapter").notNull(),
  verse: integer("verse").notNull(),
  note: text("note"),
  createdAt: timestamp("created_at").defaultNow(),
});

// User highlights table
export const highlights = pgTable("highlights", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  bookId: integer("book_id").references(() => bibleBooks.id).notNull(),
  chapter: integer("chapter").notNull(),
  verse: integer("verse").notNull(),
  color: varchar("color").default("yellow"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Reading progress table
export const readingProgress = pgTable("reading_progress", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  bookId: integer("book_id").references(() => bibleBooks.id).notNull(),
  chapter: integer("chapter").notNull(),
  completedAt: timestamp("completed_at").defaultNow(),
});

// Daily verses table
export const dailyVerses = pgTable("daily_verses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  date: varchar("date").notNull().unique(), // YYYY-MM-DD format
  bookId: integer("book_id").references(() => bibleBooks.id).notNull(),
  chapter: integer("chapter").notNull(),
  verse: integer("verse").notNull(),
  explanation: text("explanation"),
});

// Prayer requests table
export const prayerRequests = pgTable("prayer_requests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  title: varchar("title").notNull(),
  description: text("description"),
  isPrivate: boolean("is_private").default(false),
  isAnswered: boolean("is_answered").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  answeredAt: timestamp("answered_at"),
});

// Schemas
export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;

export type BibleBook = typeof bibleBooks.$inferSelect;
export type InsertBibleBook = typeof bibleBooks.$inferInsert;

export type BibleVerse = typeof bibleVerses.$inferSelect;
export type InsertBibleVerse = typeof bibleVerses.$inferInsert;

export type Bookmark = typeof bookmarks.$inferSelect;
export type InsertBookmark = typeof bookmarks.$inferInsert;
export const insertBookmarkSchema = createInsertSchema(bookmarks).omit({
  id: true,
  createdAt: true,
});

export type Highlight = typeof highlights.$inferSelect;
export type InsertHighlight = typeof highlights.$inferInsert;
export const insertHighlightSchema = createInsertSchema(highlights).omit({
  id: true,
  createdAt: true,
});

export type ReadingProgress = typeof readingProgress.$inferSelect;
export type InsertReadingProgress = typeof readingProgress.$inferInsert;
export const insertReadingProgressSchema = createInsertSchema(readingProgress).omit({
  id: true,
  completedAt: true,
});

export type DailyVerse = typeof dailyVerses.$inferSelect;
export type InsertDailyVerse = typeof dailyVerses.$inferInsert;

export type PrayerRequest = typeof prayerRequests.$inferSelect;
export type InsertPrayerRequest = typeof prayerRequests.$inferInsert;
export const insertPrayerRequestSchema = createInsertSchema(prayerRequests).omit({
  id: true,
  createdAt: true,
  answeredAt: true,
});
