import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/hooks/useAuth";
import type { DailyVerse, Bookmark } from "@shared/schema";

export default function RightSidebar() {
  const { isAuthenticated } = useAuth();

  const { data: dailyVerse } = useQuery<DailyVerse & { book: any; verseText: string }>({
    queryKey: ["/api/daily-verse"],
    retry: false,
  });

  const { data: bookmarks = [] } = useQuery<(Bookmark & { book: any; verseText: string })[]>({
    queryKey: ["/api/bookmarks"],
    enabled: isAuthenticated,
    retry: false,
  });

  const recentBookmarks = bookmarks.slice(0, 3);

  return (
    <aside className="hidden xl:block w-80 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 overflow-y-auto custom-scrollbar">
      <div className="p-6 space-y-6">
        
        {/* Daily Verse Card */}
        <Card className="bg-gradient-to-br from-bible-primary/10 via-bible-secondary/10 to-purple-50 dark:from-bible-primary/20 dark:via-bible-secondary/20 dark:to-purple-900/20 border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">Verse of the Day</h3>
              <i className="fas fa-calendar-day text-bible-primary"></i>
            </div>
            {dailyVerse ? (
              <>
                <blockquote className="text-gray-800 dark:text-gray-200 italic mb-3" data-testid="text-daily-verse">
                  "{dailyVerse.verseText}"
                </blockquote>
                <cite className="text-sm font-medium text-bible-primary" data-testid="text-daily-verse-reference">
                  {dailyVerse.book.name} {dailyVerse.chapter}:{dailyVerse.verse}
                </cite>
                {dailyVerse.explanation && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-3" data-testid="text-daily-verse-explanation">
                    {dailyVerse.explanation}
                  </p>
                )}
              </>
            ) : (
              <>
                <blockquote className="text-gray-800 dark:text-gray-200 italic mb-3">
                  "For I know the plans I have for you," declares the Lord, "plans to prosper you and not to harm you, to give you hope and a future."
                </blockquote>
                <cite className="text-sm font-medium text-bible-primary">Jeremiah 29:11</cite>
              </>
            )}
            <div className="mt-4">
              <Button 
                className="w-full bg-bible-primary text-white hover:bg-bible-primary/90"
                data-testid="button-read-daily-verse"
              >
                Read Full Context
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Study Tools */}
        <Card className="bg-gray-50 dark:bg-gray-700 border-0">
          <CardContent className="p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Study Tools</h3>
            <div className="space-y-3">
              <Button
                variant="ghost"
                className="w-full justify-start p-3 h-auto hover:bg-white dark:hover:bg-gray-600"
                data-testid="button-concordance"
              >
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-3">
                  <i className="fas fa-search text-blue-600 dark:text-blue-400"></i>
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-900 dark:text-white">Concordance</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Find word usage</p>
                </div>
              </Button>
              
              <Button
                variant="ghost"
                className="w-full justify-start p-3 h-auto hover:bg-white dark:hover:bg-gray-600"
                data-testid="button-commentary"
              >
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-3">
                  <i className="fas fa-book text-green-600 dark:text-green-400"></i>
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-900 dark:text-white">Commentary</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Study insights</p>
                </div>
              </Button>
              
              <Button
                variant="ghost"
                className="w-full justify-start p-3 h-auto hover:bg-white dark:hover:bg-gray-600"
                data-testid="button-cross-references"
              >
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mr-3">
                  <i className="fas fa-link text-purple-600 dark:text-purple-400"></i>
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-900 dark:text-white">Cross References</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Related verses</p>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Bookmarks */}
        <Card className="bg-gray-50 dark:bg-gray-700 border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">Recent Bookmarks</h3>
              <Button variant="ghost" size="sm" className="text-bible-primary hover:text-bible-secondary" data-testid="button-view-all-bookmarks">
                View All
              </Button>
            </div>
            <div className="space-y-3">
              {recentBookmarks.length > 0 ? (
                recentBookmarks.map((bookmark) => (
                  <div 
                    key={bookmark.id}
                    className="flex items-start space-x-3 p-3 hover:bg-white dark:hover:bg-gray-600 rounded-lg transition-colors cursor-pointer"
                    data-testid={`bookmark-item-${bookmark.id}`}
                  >
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 shrink-0"></div>
                    <div className="min-w-0">
                      <p className="font-medium text-gray-900 dark:text-white text-sm">
                        {bookmark.book.name} {bookmark.chapter}:{bookmark.verse}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                        {bookmark.verseText.substring(0, 50)}...
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        {new Date(bookmark.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <>
                  {/* Default bookmarks when user has none */}
                  <div className="flex items-start space-x-3 p-3 hover:bg-white dark:hover:bg-gray-600 rounded-lg transition-colors cursor-pointer">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 shrink-0"></div>
                    <div className="min-w-0">
                      <p className="font-medium text-gray-900 dark:text-white text-sm">John 3:16</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 truncate">For God so loved the world...</p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Start bookmarking verses</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Reading Plan */}
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">Reading Plan</h3>
              <i className="fas fa-route text-green-600 dark:text-green-400"></i>
            </div>
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-700 dark:text-gray-300">Bible in One Year</span>
                <span className="text-green-600 dark:text-green-400 font-medium">Day 47</span>
              </div>
              <Progress value={13} className="mb-2" />
              <p className="text-xs text-gray-600 dark:text-gray-400">318 days remaining</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-white/50 dark:bg-gray-700/50 rounded-lg">
                <span className="text-sm font-medium text-gray-900 dark:text-white">Genesis 2-3</span>
                <Button variant="ghost" size="sm" className="text-xs text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300" data-testid="button-mark-complete">
                  Mark Done
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </aside>
  );
}
