import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { BibleVerse, BibleBook } from "@shared/schema";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToVerse: (bookId: number, chapter: number) => void;
}

export default function SearchModal({ isOpen, onClose, onNavigateToVerse }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const { data: searchResults = [], isLoading } = useQuery<BibleVerse[]>({
    queryKey: ["/api/bible/search", { q: searchQuery, lang: "en" }],
    enabled: searchQuery.length > 2,
  });

  const { data: books = [] } = useQuery<BibleBook[]>({
    queryKey: ["/api/bible/books"],
  });

  const getBookById = (bookId: number) => books.find(book => book.id === bookId);

  const filteredResults = searchResults.filter(verse => {
    const book = getBookById(verse.bookId);
    if (activeFilter === "all") return true;
    if (activeFilter === "old" && book?.testament === "old") return true;
    if (activeFilter === "new" && book?.testament === "new") return true;
    return false;
  });

  const handleVerseClick = (verse: BibleVerse) => {
    onNavigateToVerse(verse.bookId, verse.chapter);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] p-0 animate-slide-up" onKeyDown={handleKeyDown}>
        <div className="p-6">
          <div className="relative mb-6">
            <Input
              type="text"
              placeholder="Search verses, topics, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-bible-primary focus:border-bible-primary"
              data-testid="input-search"
              autoFocus
            />
            <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          </div>

          {/* Search Filters */}
          <div className="flex items-center space-x-4 mb-6">
            <Button
              variant={activeFilter === "all" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveFilter("all")}
              className={activeFilter === "all" ? "bg-bible-primary text-white" : ""}
              data-testid="filter-all"
            >
              All
            </Button>
            <Button
              variant={activeFilter === "old" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveFilter("old")}
              className={activeFilter === "old" ? "bg-bible-primary text-white" : ""}
              data-testid="filter-old-testament"
            >
              Old Testament
            </Button>
            <Button
              variant={activeFilter === "new" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveFilter("new")}
              className={activeFilter === "new" ? "bg-bible-primary text-white" : ""}
              data-testid="filter-new-testament"
            >
              New Testament
            </Button>
          </div>

          {/* Search Results */}
          <div className="max-h-96 overflow-y-auto custom-scrollbar">
            {searchQuery.length === 0 && (
              <div className="text-center py-12">
                <i className="fas fa-search text-4xl text-gray-300 dark:text-gray-600 mb-4"></i>
                <p className="text-gray-500 dark:text-gray-400">Start typing to search the Bible</p>
              </div>
            )}

            {searchQuery.length > 0 && searchQuery.length <= 2 && (
              <div className="text-center py-12">
                <i className="fas fa-keyboard text-4xl text-gray-300 dark:text-gray-600 mb-4"></i>
                <p className="text-gray-500 dark:text-gray-400">Type at least 3 characters to search</p>
              </div>
            )}

            {searchQuery.length > 2 && isLoading && (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-bible-primary mx-auto mb-4"></div>
                <p className="text-gray-500 dark:text-gray-400">Searching...</p>
              </div>
            )}

            {searchQuery.length > 2 && !isLoading && filteredResults.length === 0 && (
              <div className="text-center py-12">
                <i className="fas fa-search text-4xl text-gray-300 dark:text-gray-600 mb-4"></i>
                <p className="text-gray-500 dark:text-gray-400">No verses found for "{searchQuery}"</p>
              </div>
            )}

            {filteredResults.length > 0 && (
              <div className="space-y-4">
                {filteredResults.slice(0, 20).map((verse) => {
                  const book = getBookById(verse.bookId);
                  
                  return (
                    <Card
                      key={verse.id}
                      className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-0 shadow-sm"
                      onClick={() => handleVerseClick(verse)}
                      data-testid={`search-result-${verse.id}`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-bible-primary">
                            {book?.name} {verse.chapter}:{verse.verse}
                          </h4>
                          <span className="text-xs text-gray-500 dark:text-gray-400">ESV</span>
                        </div>
                        <p className="text-gray-800 dark:text-gray-200 text-sm leading-relaxed">
                          {verse.textEnglish}
                        </p>
                      </CardContent>
                    </Card>
                  );
                })}
                
                {filteredResults.length > 20 && (
                  <div className="text-center py-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Showing first 20 of {filteredResults.length} results. Try a more specific search.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
