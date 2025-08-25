import { useState } from "react";
import AppHeader from "@/components/AppHeader";
import MobileNavigation from "@/components/MobileNavigation";
import Sidebar from "@/components/Sidebar";
import MainContent from "@/components/MainContent";
import RightSidebar from "@/components/RightSidebar";
import ShareModal from "@/components/ShareModal";
import SearchModal from "@/components/SearchModal";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentBook, setCurrentBook] = useState(1);
  const [currentChapter, setCurrentChapter] = useState(1);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [selectedVerse, setSelectedVerse] = useState<{ text: string; reference: string } | null>(null);

  const handleShareVerse = (verse: { text: string; reference: string }) => {
    setSelectedVerse(verse);
    setShareModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background font-inter">
      <AppHeader 
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        onOpenSearch={() => setSearchModalOpen(true)}
      />
      
      <div className="flex min-h-screen pt-0 pb-20 md:pb-0">
        <Sidebar 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)}
          currentBook={currentBook}
          currentChapter={currentChapter}
          onBookChange={setCurrentBook}
          onChapterChange={setCurrentChapter}
        />
        
        <MainContent 
          bookId={currentBook}
          chapter={currentChapter}
          onShareVerse={handleShareVerse}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          onPreviousChapter={() => setCurrentChapter(Math.max(1, currentChapter - 1))}
          onNextChapter={() => setCurrentChapter(currentChapter + 1)}
        />
        
        <RightSidebar />
      </div>

      <MobileNavigation />

      <ShareModal 
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        verse={selectedVerse}
      />

      <SearchModal 
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onNavigateToVerse={(bookId: number, chapter: number) => {
          setCurrentBook(bookId);
          setCurrentChapter(chapter);
          setSearchModalOpen(false);
        }}
      />
    </div>
  );
}
