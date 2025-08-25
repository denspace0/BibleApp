import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { cn } from "@/lib/utils";
import type { BibleBook, BibleVerse, Highlight } from "@shared/schema";

interface MainContentProps {
  bookId: number;
  chapter: number;
  onShareVerse: (verse: { text: string; reference: string }) => void;
  onToggleSidebar: () => void;
  onPreviousChapter: () => void;
  onNextChapter: () => void;
}

export default function MainContent({ 
  bookId, 
  chapter, 
  onShareVerse, 
  onToggleSidebar, 
  onPreviousChapter, 
  onNextChapter 
}: MainContentProps) {
  const [fontSize, setFontSize] = useState(18);
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: book } = useQuery<BibleBook>({
    queryKey: ["/api/bible/books", bookId],
    enabled: !!bookId,
  });

  const { data: verses = [], isLoading } = useQuery<BibleVerse[]>({
    queryKey: ["/api/bible/verses", bookId, chapter],
    enabled: !!bookId && !!chapter,
  });

  const { data: highlights = [] } = useQuery<Highlight[]>({
    queryKey: ["/api/highlights", { bookId, chapter }],
    enabled: isAuthenticated,
    retry: false,
  });

  const createHighlightMutation = useMutation({
    mutationFn: async (data: { bookId: number; chapter: number; verse: number; color: string }) => {
      await apiRequest("POST", "/api/highlights", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/highlights"] });
      toast({ title: "Verse highlighted!" });
    },
    onError: () => {
      toast({ title: "Failed to highlight verse", variant: "destructive" });
    },
  });

  const createBookmarkMutation = useMutation({
    mutationFn: async (data: { bookId: number; chapter: number; verse: number; note?: string }) => {
      await apiRequest("POST", "/api/bookmarks", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/bookmarks"] });
      toast({ title: "Verse bookmarked!" });
    },
    onError: () => {
      toast({ title: "Failed to bookmark verse", variant: "destructive" });
    },
  });

  const handleHighlightVerse = (verse: BibleVerse) => {
    if (!isAuthenticated) {
      toast({ title: "Please sign in to highlight verses", variant: "destructive" });
      return;
    }

    createHighlightMutation.mutate({
      bookId: verse.bookId,
      chapter: verse.chapter,
      verse: verse.verse,
      color: "yellow",
    });
  };

  const handleBookmarkVerse = (verse: BibleVerse) => {
    if (!isAuthenticated) {
      toast({ title: "Please sign in to bookmark verses", variant: "destructive" });
      return;
    }

    createBookmarkMutation.mutate({
      bookId: verse.bookId,
      chapter: verse.chapter,
      verse: verse.verse,
    });
  };

  const handleShareVerse = (verse: BibleVerse) => {
    const reference = `${book?.name} ${verse.chapter}:${verse.verse}`;
    onShareVerse({
      text: verse.textEnglish,
      reference: reference,
    });
  };

  const isVerseHighlighted = (verse: BibleVerse) => {
    return highlights.some(h => 
      h.bookId === verse.bookId && 
      h.chapter === verse.chapter && 
      h.verse === verse.verse
    );
  };

  if (isLoading) {
    return (
      <main className="flex-1 min-w-0 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 bg-gradient-to-br from-bible-primary to-bible-secondary rounded-lg flex items-center justify-center mx-auto mb-4 animate-pulse">
            <i className="fas fa-book-open text-white text-sm"></i>
          </div>
          <p className="text-muted-foreground">Loading chapter...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 min-w-0 bg-gray-50 dark:bg-gray-900">
      {/* Reading Controls */}
      <div className="sticky top-16 z-30 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 px-4 py-3">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleSidebar}
              className="lg:hidden p-2 text-gray-500 dark:text-gray-400 hover:text-bible-primary"
              data-testid="button-toggle-sidebar"
            >
              <i className="fas fa-bars"></i>
            </Button>
            
            <div className="flex items-center space-x-2">
              <h1 className="text-lg font-semibold text-gray-900 dark:text-white" data-testid="text-current-passage">
                {book?.name} {chapter}
              </h1>
              <span className="text-sm text-gray-500 dark:text-gray-400">ESV</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Font Size Controls */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setFontSize(Math.max(12, fontSize - 2))}
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-bible-primary text-sm"
              data-testid="button-decrease-font"
            >
              <i className="fas fa-minus"></i>
            </Button>
            <span className="text-sm text-gray-600 dark:text-gray-400 min-w-12 text-center" data-testid="text-font-size">
              {fontSize}px
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setFontSize(Math.min(28, fontSize + 2))}
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-bible-primary text-sm"
              data-testid="button-increase-font"
            >
              <i className="fas fa-plus"></i>
            </Button>
            
            {/* Audio Button */}
            <Button
              variant="ghost"
              size="sm"
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-bible-primary"
              data-testid="button-audio"
            >
              <i className="fas fa-volume-up"></i>
            </Button>
            
            {/* More Options */}
            <Button
              variant="ghost"
              size="sm"
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-bible-primary"
              data-testid="button-options"
            >
              <i className="fas fa-cog"></i>
            </Button>
          </div>
        </div>
      </div>

      {/* Bible Text Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <CardContent className="p-6 md:p-8">
            {/* Chapter Header */}
            <header className="mb-8 text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2" data-testid="text-chapter-title">
                {book?.name} {chapter}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                {book?.testament === 'old' ? 'Old Testament' : 'New Testament'}
              </p>
            </header>

            {/* Bible Verses */}
            <div className="space-y-4 leading-relaxed text-lg text-gray-800 dark:text-gray-200 reading-text" style={{ fontSize: `${fontSize}px`, lineHeight: 1.8 }}>
              {verses.map((verse) => {
                const highlighted = isVerseHighlighted(verse);
                
                return (
                  <div 
                    key={verse.id}
                    className={cn(
                      "group relative",
                      highlighted && "verse-highlight-yellow"
                    )}
                    data-testid={`verse-${verse.verse}`}
                  >
                    <span className="inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-bible-primary bg-bible-primary/10 rounded-full mr-3 shrink-0">
                      {verse.verse}
                    </span>
                    <span 
                      className="cursor-pointer hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition-colors duration-200 px-1 py-0.5 rounded"
                      onClick={() => handleHighlightVerse(verse)}
                      data-testid={`text-verse-${verse.verse}`}
                    >
                      {verse.textEnglish}
                    </span>
                    
                    {/* Verse Actions */}
                    <div className="absolute left-full ml-2 top-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-1">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-8 h-8 p-0 border-gray-200 dark:border-gray-600 hover:border-bible-primary hover:text-bible-primary"
                        onClick={() => handleBookmarkVerse(verse)}
                        data-testid={`button-bookmark-${verse.verse}`}
                      >
                        <i className="fas fa-bookmark text-xs"></i>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-8 h-8 p-0 border-gray-200 dark:border-gray-600 hover:border-bible-primary hover:text-bible-primary"
                        onClick={() => handleShareVerse(verse)}
                        data-testid={`button-share-${verse.verse}`}
                      >
                        <i className="fas fa-share text-xs"></i>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-8 h-8 p-0 border-gray-200 dark:border-gray-600 hover:border-bible-primary hover:text-bible-primary"
                        data-testid={`button-note-${verse.verse}`}
                      >
                        <i className="fas fa-sticky-note text-xs"></i>
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Chapter Navigation */}
            <div className="flex items-center justify-between mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
              <Button
                variant="ghost"
                onClick={onPreviousChapter}
                disabled={chapter <= 1}
                className="flex items-center space-x-2 text-bible-primary hover:bg-bible-primary/10"
                data-testid="button-previous-chapter"
              >
                <i className="fas fa-chevron-left"></i>
                <span>Previous</span>
              </Button>
              
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  className="text-gray-600 dark:text-gray-400 hover:text-bible-primary hover:bg-gray-50 dark:hover:bg-gray-700"
                  data-testid="button-chapter-list"
                >
                  View All Chapters
                </Button>
              </div>
              
              <Button
                variant="ghost"
                onClick={onNextChapter}
                disabled={book && chapter >= book.chapters}
                className="flex items-center space-x-2 text-bible-primary hover:bg-bible-primary/10"
                data-testid="button-next-chapter"
              >
                <span>Next</span>
                <i className="fas fa-chevron-right"></i>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
