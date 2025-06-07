import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface CompletionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRestart: () => void;
}

export function CompletionModal({ isOpen, onClose, onRestart }: CompletionModalProps) {
  const handleRestart = () => {
    onRestart();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-4 p-8 text-center rounded-3xl">
        <div 
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ background: 'linear-gradient(135deg, var(--gold), #f59e0b)' }}
        >
          <i className="fas fa-star text-white text-2xl"></i>
        </div>
        
        <h3 
          className="text-2xl font-bold mb-4"
          style={{ color: 'var(--charcoal)' }}
        >
          Alhamdulillah!
        </h3>
        <p className="text-gray-600 mb-6">
          You have completed reading all 99 Beautiful Names of Allah
        </p>
        
        <div 
          className="rounded-2xl p-6 mb-6"
          style={{ backgroundColor: 'var(--mint)' }}
        >
          <div 
            className="arabic-text text-3xl font-bold mb-2"
            style={{ color: 'var(--teal-primary)' }}
          >
            لا إله إلا الله
          </div>
          <div 
            className="text-lg font-medium mb-1"
            style={{ color: 'var(--charcoal)' }}
          >
            Lā ilāha illā Allāh
          </div>
          <div className="text-sm text-gray-600">
            There is no god but Allah
          </div>
        </div>
        
        <div className="flex space-x-3">
          <Button
            onClick={handleRestart}
            className="flex-1 text-white px-4 py-2 rounded-full transition-colors"
            style={{ backgroundColor: 'var(--teal-primary)' }}
          >
            Start Again
          </Button>
          <Button
            onClick={onClose}
            variant="ghost"
            className="flex-1 bg-gray-100 px-4 py-2 rounded-full hover:bg-gray-200 transition-colors"
            style={{ color: 'var(--charcoal)' }}
          >
            Continue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
