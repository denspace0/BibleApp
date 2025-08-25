import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  verse: { text: string; reference: string } | null;
}

export default function ShareModal({ isOpen, onClose, verse }: ShareModalProps) {
  const { toast } = useToast();

  const handleCopyToClipboard = () => {
    if (!verse) return;
    
    const textToCopy = `"${verse.text}"\n- ${verse.reference}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      toast({ title: "Copied to clipboard!" });
      onClose();
    });
  };

  const handleShareToFacebook = () => {
    if (!verse) return;
    
    const text = encodeURIComponent(`"${verse.text}" - ${verse.reference}`);
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.origin)}&quote=${text}`;
    window.open(url, '_blank', 'width=600,height=400');
    onClose();
  };

  const handleShareToTwitter = () => {
    if (!verse) return;
    
    const text = encodeURIComponent(`"${verse.text}" - ${verse.reference} #Bible #Verse`);
    const url = `https://twitter.com/intent/tweet?text=${text}`;
    window.open(url, '_blank', 'width=600,height=400');
    onClose();
  };

  const handleShareToWhatsApp = () => {
    if (!verse) return;
    
    const text = encodeURIComponent(`"${verse.text}"\n- ${verse.reference}`);
    const url = `https://wa.me/?text=${text}`;
    window.open(url, '_blank');
    onClose();
  };

  if (!verse) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md animate-slide-up">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <i className="fas fa-share text-bible-primary"></i>
            <span>Share Verse</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <Card className="bg-gray-50 dark:bg-gray-700 border-0">
            <CardContent className="p-4">
              <blockquote className="text-gray-800 dark:text-gray-200 italic mb-2" data-testid="text-share-verse">
                "{verse.text}"
              </blockquote>
              <cite className="text-sm font-medium text-bible-primary" data-testid="text-share-reference">
                {verse.reference}
              </cite>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              onClick={handleShareToFacebook}
              className="flex items-center justify-center space-x-2 p-3 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/40 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800"
              data-testid="button-share-facebook"
            >
              <i className="fab fa-facebook"></i>
              <span className="text-sm font-medium">Facebook</span>
            </Button>
            <Button
              variant="outline"
              onClick={handleShareToTwitter}
              className="flex items-center justify-center space-x-2 p-3 bg-sky-50 hover:bg-sky-100 dark:bg-sky-900/20 dark:hover:bg-sky-900/40 text-sky-600 dark:text-sky-400 border-sky-200 dark:border-sky-800"
              data-testid="button-share-twitter"
            >
              <i className="fab fa-twitter"></i>
              <span className="text-sm font-medium">Twitter</span>
            </Button>
            <Button
              variant="outline"
              onClick={handleShareToWhatsApp}
              className="flex items-center justify-center space-x-2 p-3 bg-green-50 hover:bg-green-100 dark:bg-green-900/20 dark:hover:bg-green-900/40 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800"
              data-testid="button-share-whatsapp"
            >
              <i className="fab fa-whatsapp"></i>
              <span className="text-sm font-medium">WhatsApp</span>
            </Button>
            <Button
              variant="outline"
              onClick={handleCopyToClipboard}
              className="flex items-center justify-center space-x-2 p-3 bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-400"
              data-testid="button-share-copy"
            >
              <i className="fas fa-copy"></i>
              <span className="text-sm font-medium">Copy</span>
            </Button>
          </div>

          <Button 
            className="w-full bg-bible-primary text-white hover:bg-bible-primary/90"
            data-testid="button-create-image"
          >
            Create Image to Share
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
