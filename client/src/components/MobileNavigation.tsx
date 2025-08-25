export default function MobileNavigation() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-around py-2">
        <a href="#" className="flex flex-col items-center space-y-1 p-2 text-bible-primary" data-testid="mobile-nav-read">
          <i className="fas fa-book-open text-lg"></i>
          <span className="text-xs font-medium">Read</span>
        </a>
        <a href="#" className="flex flex-col items-center space-y-1 p-2 text-gray-500 dark:text-gray-400 hover:text-bible-primary transition-colors" data-testid="mobile-nav-search">
          <i className="fas fa-search text-lg"></i>
          <span className="text-xs font-medium">Search</span>
        </a>
        <a href="#" className="flex flex-col items-center space-y-1 p-2 text-gray-500 dark:text-gray-400 hover:text-bible-primary transition-colors" data-testid="mobile-nav-bookmarks">
          <i className="fas fa-bookmark text-lg"></i>
          <span className="text-xs font-medium">Saved</span>
        </a>
        <a href="#" className="flex flex-col items-center space-y-1 p-2 text-gray-500 dark:text-gray-400 hover:text-bible-primary transition-colors" data-testid="mobile-nav-pray">
          <i className="fas fa-praying-hands text-lg"></i>
          <span className="text-xs font-medium">Pray</span>
        </a>
        <a href="#" className="flex flex-col items-center space-y-1 p-2 text-gray-500 dark:text-gray-400 hover:text-bible-primary transition-colors" data-testid="mobile-nav-profile">
          <i className="fas fa-user text-lg"></i>
          <span className="text-xs font-medium">Profile</span>
        </a>
      </div>
    </nav>
  );
}
