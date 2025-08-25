import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/components/ThemeProvider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AppHeaderProps {
  onToggleSidebar: () => void;
  onOpenSearch: () => void;
}

export default function AppHeader({ onToggleSidebar, onOpenSearch }: AppHeaderProps) {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [currentLanguage, setCurrentLanguage] = useState("EN");

  const userInitials = user ? 
    `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase() || 'U' :
    'U';

  const toggleLanguage = () => {
    setCurrentLanguage(currentLanguage === "EN" ? "TL" : "EN");
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-bible-primary to-bible-secondary rounded-lg flex items-center justify-center">
              <i className="fas fa-book-open text-white text-sm"></i>
            </div>
            <h1 className="text-xl font-bold gradient-text">
              BibleApp
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-bible-primary font-medium hover:text-bible-secondary transition-colors" data-testid="nav-read">
              Read
            </a>
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-bible-primary transition-colors" data-testid="nav-study">
              Study
            </a>
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-bible-primary transition-colors" data-testid="nav-pray">
              Pray
            </a>
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-bible-primary transition-colors" data-testid="nav-community">
              Community
            </a>
          </nav>

          {/* Search and Actions */}
          <div className="flex items-center space-x-3">
            {/* Search Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onOpenSearch}
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-bible-primary"
              data-testid="button-search"
            >
              <i className="fas fa-search"></i>
            </Button>
            
            {/* Language Toggle */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="border-gray-200 dark:border-gray-700" data-testid="dropdown-language">
                  <span>{currentLanguage}</span>
                  <i className="fas fa-chevron-down ml-1 text-xs"></i>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={toggleLanguage} data-testid="language-english">
                  <i className="fas fa-flag mr-2"></i>
                  English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={toggleLanguage} data-testid="language-tagalog">
                  <i className="fas fa-flag mr-2"></i>
                  Tagalog
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-bible-primary"
              data-testid="button-theme-toggle"
            >
              {theme === "light" ? (
                <i className="fas fa-moon"></i>
              ) : (
                <i className="fas fa-sun"></i>
              )}
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="p-1" data-testid="dropdown-user">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={user?.profileImageUrl || undefined} alt={user?.firstName || "User"} />
                    <AvatarFallback className="bg-gradient-to-br from-bible-primary to-bible-secondary text-white text-sm">
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center space-x-2 p-2">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={user?.profileImageUrl || undefined} alt={user?.firstName || "User"} />
                    <AvatarFallback className="bg-gradient-to-br from-bible-primary to-bible-secondary text-white text-xs">
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{user?.firstName} {user?.lastName}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem data-testid="menu-profile">
                  <i className="fas fa-user mr-2"></i>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem data-testid="menu-bookmarks">
                  <i className="fas fa-bookmark mr-2"></i>
                  Bookmarks
                </DropdownMenuItem>
                <DropdownMenuItem data-testid="menu-settings">
                  <i className="fas fa-cog mr-2"></i>
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={() => window.location.href = '/api/logout'}
                  data-testid="menu-logout"
                >
                  <i className="fas fa-sign-out-alt mr-2"></i>
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleSidebar}
              className="md:hidden p-2 text-gray-500 dark:text-gray-400 hover:text-bible-primary"
              data-testid="button-mobile-menu"
            >
              <i className="fas fa-bars"></i>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
