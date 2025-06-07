import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { type Name } from '@/data/names';

interface AllNamesModalProps {
  isOpen: boolean;
  onClose: () => void;
  names: Name[];
  onSelectName: (nameNumber: number) => void;
}

export function AllNamesModal({ isOpen, onClose, names, onSelectName }: AllNamesModalProps) {
  const handleNameClick = (nameNumber: number) => {
    onSelectName(nameNumber);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0">
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-gray-200 p-4 rounded-t-lg">
          <div className="flex justify-between items-center">
            <h2 
              className="text-xl font-bold"
              style={{ color: 'var(--teal-primary)' }}
            >
              All 99 Names
            </h2>
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="p-2 text-gray-500 hover:text-teal-600 transition-colors"
            >
              <i className="fas fa-times text-xl"></i>
            </Button>
          </div>
        </div>
        
        {/* Names Grid */}
        <ScrollArea className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {names.map((name) => (
              <div
                key={name.number}
                onClick={() => handleNameClick(name.number)}
                className="bg-white rounded-2xl p-4 shadow-sm border hover:shadow-md transition-all cursor-pointer"
                style={{ borderColor: 'var(--teal-primary)20' }}
              >
                <div className="text-center">
                  <div 
                    className="text-sm font-bold mb-2"
                    style={{ color: 'var(--gold)' }}
                  >
                    #{name.number}
                  </div>
                  <div 
                    className="arabic-text text-2xl font-bold mb-2"
                    style={{ color: 'var(--teal-primary)' }}
                  >
                    {name.arabic}
                  </div>
                  <div 
                    className="font-medium mb-1"
                    style={{ color: 'var(--charcoal)' }}
                  >
                    {name.transliteration}
                  </div>
                  <div className="text-sm text-gray-600">
                    {name.translationEn}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
