import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import type { BibleBook } from "@shared/schema";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentBook: number;
  currentChapter: number;
  onBookChange: (bookId: number) => void;
  onChapterChange: (chapter: number) => void;
}

export default function Sidebar({ 
  isOpen, 
  onClose, 
  currentBook, 
  currentChapter, 
  onBookChange, 
  onChapterChange 
}: SidebarProps) {
  const { data: books = [] } = useQuery<BibleBook[]>({
    queryKey: ["/api/bible/books"],
  });

  const { data: book } = useQuery<BibleBook>({
    queryKey: ["/api/bible/books", currentBook],
    enabled: !!currentBook,
  });

  const chapters = book ? Array.from({ length: book.chapters }, (_, i) => i + 1) : [];

  // Mock recent books - in real app this would come from user's reading history
  const recentBooks = [
    { name: "Matthew", lastChapter: "5:16", bookId: 40 },
    { name: "Psalms", lastChapter: "23:4", bookId: 19 },
    { name: "Romans", lastChapter: "8:28", bookId: 45 },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
          data-testid="sidebar-overlay"
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed lg:static inset-y-0 left-0 z-50 w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto custom-scrollbar transition-transform duration-300 lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6">
          {/* Close button for mobile */}
          <div className="lg:hidden flex justify-end mb-4">
            <Button variant="ghost" size="sm" onClick={onClose} data-testid="button-close-sidebar">
              <i className="fas fa-times"></i>
            </Button>
          </div>

          {/* Bible Book Selector */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Bible Books</h2>
              <Button variant="ghost" size="sm" className="text-bible-primary hover:text-bible-secondary" data-testid="button-browse-books">
                Browse All
              </Button>
            </div>
            
            {/* Current Book */}
            {book && (
              <div className="bg-gradient-to-r from-bible-primary/10 to-bible-secondary/10 rounded-xl p-4 mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-bible-primary rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{book.id}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{book.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{book.testament === 'old' ? 'Old Testament' : 'New Testament'}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Book Navigation */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Quick Access</h4>
              {recentBooks.map((recentBook) => (
                <Button
                  key={recentBook.bookId}
                  variant="ghost"
                  className="w-full justify-between text-left p-3 h-auto text-sm text-gray-600 dark:text-gray-400 hover:text-bible-primary hover:bg-gray-50 dark:hover:bg-gray-700"
                  onClick={() => onBookChange(recentBook.bookId)}
                  data-testid={`button-recent-book-${recentBook.bookId}`}
                >
                  <span>{recentBook.name}</span>
                  <span className="text-xs">{recentBook.lastChapter}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Chapter Navigation */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Chapters</h4>
            <div className="grid grid-cols-5 gap-2">
              {chapters.map((chapter) => (
                <Button
                  key={chapter}
                  variant={currentChapter === chapter ? "default" : "outline"}
                  size="sm"
                  className={cn(
                    "w-full h-10 text-sm font-medium",
                    currentChapter === chapter
                      ? "bg-bible-primary text-white border-bible-primary"
                      : "border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-bible-primary hover:text-bible-primary"
                  )}
                  onClick={() => onChapterChange(chapter)}
                  data-testid={`button-chapter-${chapter}`}
                >
                  {chapter}
                </Button>
              ))}
            </div>
          </div>

          {/* Reading Progress */}
          <Card className="bg-gray-50 dark:bg-gray-700 border-0">
            <CardContent className="p-4">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Today's Progress</h4>
              <div className="flex items-center space-x-2 mb-2">
                <Progress value={75} className="flex-1" />
                <span className="text-sm text-gray-600 dark:text-gray-400">75%</span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">3 chapters completed</p>
            </CardContent>
          </Card>
        </div>
      </aside>
    </>
  );
}
