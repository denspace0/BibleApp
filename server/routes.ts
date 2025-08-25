import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { insertBookmarkSchema, insertHighlightSchema, insertReadingProgressSchema, insertPrayerRequestSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // User preferences
  app.patch('/api/user/preferences', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { language, theme, fontSize } = req.body;
      
      const user = await storage.updateUserPreferences(userId, {
        language,
        theme,
        fontSize
      });
      
      res.json(user);
    } catch (error) {
      console.error("Error updating user preferences:", error);
      res.status(500).json({ message: "Failed to update preferences" });
    }
  });

  // Bible routes
  app.get('/api/bible/books', async (req, res) => {
    try {
      const books = await storage.getBibleBooks();
      res.json(books);
    } catch (error) {
      console.error("Error fetching Bible books:", error);
      res.status(500).json({ message: "Failed to fetch Bible books" });
    }
  });

  app.get('/api/bible/books/:id', async (req, res) => {
    try {
      const bookId = parseInt(req.params.id);
      const book = await storage.getBibleBook(bookId);
      
      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }
      
      res.json(book);
    } catch (error) {
      console.error("Error fetching Bible book:", error);
      res.status(500).json({ message: "Failed to fetch Bible book" });
    }
  });

  app.get('/api/bible/verses/:bookId/:chapter', async (req, res) => {
    try {
      const bookId = parseInt(req.params.bookId);
      const chapter = parseInt(req.params.chapter);
      
      const verses = await storage.getBibleVerses(bookId, chapter);
      res.json(verses);
    } catch (error) {
      console.error("Error fetching Bible verses:", error);
      res.status(500).json({ message: "Failed to fetch Bible verses" });
    }
  });

  app.get('/api/bible/search', async (req, res) => {
    try {
      const { q: query, lang: language } = req.query;
      
      if (!query || typeof query !== 'string') {
        return res.status(400).json({ message: "Query parameter is required" });
      }
      
      const verses = await storage.searchVerses(query, language as string);
      res.json(verses);
    } catch (error) {
      console.error("Error searching verses:", error);
      res.status(500).json({ message: "Failed to search verses" });
    }
  });

  // Bookmark routes
  app.get('/api/bookmarks', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const bookmarks = await storage.getUserBookmarks(userId);
      res.json(bookmarks);
    } catch (error) {
      console.error("Error fetching bookmarks:", error);
      res.status(500).json({ message: "Failed to fetch bookmarks" });
    }
  });

  app.post('/api/bookmarks', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const bookmarkData = insertBookmarkSchema.parse({
        ...req.body,
        userId
      });
      
      const bookmark = await storage.createBookmark(bookmarkData);
      res.json(bookmark);
    } catch (error) {
      console.error("Error creating bookmark:", error);
      res.status(500).json({ message: "Failed to create bookmark" });
    }
  });

  app.delete('/api/bookmarks/:id', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const bookmarkId = req.params.id;
      
      await storage.deleteBookmark(bookmarkId, userId);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting bookmark:", error);
      res.status(500).json({ message: "Failed to delete bookmark" });
    }
  });

  // Highlight routes
  app.get('/api/highlights', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const bookId = req.query.bookId ? parseInt(req.query.bookId as string) : undefined;
      const chapter = req.query.chapter ? parseInt(req.query.chapter as string) : undefined;
      
      const highlights = await storage.getUserHighlights(userId, bookId, chapter);
      res.json(highlights);
    } catch (error) {
      console.error("Error fetching highlights:", error);
      res.status(500).json({ message: "Failed to fetch highlights" });
    }
  });

  app.post('/api/highlights', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const highlightData = insertHighlightSchema.parse({
        ...req.body,
        userId
      });
      
      const highlight = await storage.createHighlight(highlightData);
      res.json(highlight);
    } catch (error) {
      console.error("Error creating highlight:", error);
      res.status(500).json({ message: "Failed to create highlight" });
    }
  });

  app.delete('/api/highlights/:id', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const highlightId = req.params.id;
      
      await storage.deleteHighlight(highlightId, userId);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting highlight:", error);
      res.status(500).json({ message: "Failed to delete highlight" });
    }
  });

  // Reading progress routes
  app.get('/api/reading-progress', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const progress = await storage.getUserReadingProgress(userId);
      res.json(progress);
    } catch (error) {
      console.error("Error fetching reading progress:", error);
      res.status(500).json({ message: "Failed to fetch reading progress" });
    }
  });

  app.post('/api/reading-progress', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const progressData = insertReadingProgressSchema.parse({
        ...req.body,
        userId
      });
      
      const progress = await storage.markChapterComplete(progressData);
      res.json(progress);
    } catch (error) {
      console.error("Error marking chapter complete:", error);
      res.status(500).json({ message: "Failed to mark chapter complete" });
    }
  });

  // Daily verse route
  app.get('/api/daily-verse', async (req, res) => {
    try {
      const date = req.query.date as string || new Date().toISOString().split('T')[0];
      const dailyVerse = await storage.getDailyVerse(date);
      
      if (!dailyVerse) {
        return res.status(404).json({ message: "Daily verse not found for this date" });
      }
      
      res.json(dailyVerse);
    } catch (error) {
      console.error("Error fetching daily verse:", error);
      res.status(500).json({ message: "Failed to fetch daily verse" });
    }
  });

  // Prayer request routes
  app.get('/api/prayer-requests', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const requests = await storage.getUserPrayerRequests(userId);
      res.json(requests);
    } catch (error) {
      console.error("Error fetching prayer requests:", error);
      res.status(500).json({ message: "Failed to fetch prayer requests" });
    }
  });

  app.post('/api/prayer-requests', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const requestData = insertPrayerRequestSchema.parse({
        ...req.body,
        userId
      });
      
      const prayerRequest = await storage.createPrayerRequest(requestData);
      res.json(prayerRequest);
    } catch (error) {
      console.error("Error creating prayer request:", error);
      res.status(500).json({ message: "Failed to create prayer request" });
    }
  });

  app.patch('/api/prayer-requests/:id', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const requestId = req.params.id;
      const { isAnswered } = req.body;
      
      const updatedRequest = await storage.updatePrayerRequest(requestId, userId, { isAnswered });
      res.json(updatedRequest);
    } catch (error) {
      console.error("Error updating prayer request:", error);
      res.status(500).json({ message: "Failed to update prayer request" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
