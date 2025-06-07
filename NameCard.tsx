import { Button } from '@/components/ui/button';
import { type Name } from '@/data/names';

interface NameCardProps {
  name: Name;
  onBookmark: () => void;
  isBookmarked: boolean;
}

export function NameCard({ name, onBookmark, isBookmarked }: NameCardProps) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${name.transliteration} - ${name.translationEn}`,
          text: `${name.arabic}\n${name.transliteration}\n${name.translationEn}`,
          url: window.location.href
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback for browsers without native sharing
      const text = `${name.arabic}\n${name.transliteration}\n${name.translationEn}\n\n${window.location.href}`;
      await navigator.clipboard.writeText(text);
      // Could show a toast notification here
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 islamic-pattern animate-slide-up">
      {/* Category Badge */}
      <div className="flex justify-center mb-4">
        <span 
          className="px-4 py-2 rounded-full text-sm font-medium text-white"
          style={{ backgroundColor: 'var(--teal-primary)' }}
        >
          {name.category}
        </span>
      </div>

      {/* Number */}
      <div className="text-center mb-6">
        <span 
          className="text-4xl font-bold"
          style={{ color: 'var(--gold)' }}
        >
          {name.number}
        </span>
        <div className="text-sm text-gray-600 mt-1">Name Number</div>
      </div>

      {/* Arabic Name */}
      <div className="text-center mb-8">
        <h2 
          className="arabic-text text-6xl font-bold mb-4 leading-relaxed"
          style={{ color: 'var(--teal-primary)' }}
        >
          {name.arabic}
        </h2>
        <div 
          className="text-2xl font-semibold mb-2"
          style={{ color: 'var(--charcoal)' }}
        >
          {name.transliteration}
        </div>
        <button className="inline-flex items-center space-x-2 text-gray-500 hover:text-teal-600 transition-colors">
          <i className="fas fa-volume-up"></i>
          <span className="text-sm">Listen</span>
        </button>
      </div>

      {/* Translations */}
      <div className="space-y-4">
        <div 
          className="rounded-2xl p-6"
          style={{ backgroundColor: 'var(--mint)' }}
        >
          <h3 
            className="font-semibold mb-3 flex items-center"
            style={{ color: 'var(--teal-primary)' }}
          >
            <i className="fas fa-globe-americas mr-2"></i>
            English Translation
          </h3>
          <p 
            className="text-lg"
            style={{ color: 'var(--charcoal)' }}
          >
            {name.translationEn}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div 
            className="rounded-2xl p-6"
            style={{ backgroundColor: 'var(--cream)' }}
          >
            <h3 
              className="font-semibold mb-3 flex items-center"
              style={{ color: 'var(--teal-primary)' }}
            >
              <i className="fas fa-language mr-2"></i>
              Urdu
            </h3>
            <p 
              className="text-lg arabic-text"
              style={{ color: 'var(--charcoal)' }}
            >
              {name.translationUrdu}
            </p>
          </div>

          <div 
            className="rounded-2xl p-6"
            style={{ backgroundColor: 'var(--cream)' }}
          >
            <h3 
              className="font-semibold mb-3 flex items-center"
              style={{ color: 'var(--teal-primary)' }}
            >
              <i className="fas fa-language mr-2"></i>
              Gujarati
            </h3>
            <p 
              className="text-lg"
              style={{ color: 'var(--charcoal)' }}
            >
              {name.translationGujarati}
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4 mt-8">
        <Button
          onClick={onBookmark}
          variant="ghost"
          className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${
            isBookmarked 
              ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' 
              : 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100'
          }`}
        >
          <i className={`fas ${isBookmarked ? 'fa-bookmark' : 'fa-bookmark-o'}`}></i>
          <span>{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
        </Button>
        <Button
          onClick={handleShare}
          variant="ghost"
          className="flex items-center space-x-2 px-4 py-2 rounded-full hover:bg-teal-50 transition-colors"
          style={{ color: 'var(--teal-primary)' }}
        >
          <i className="fas fa-share"></i>
          <span>Share</span>
        </Button>
      </div>
    </div>
  );
}
