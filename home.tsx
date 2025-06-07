import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { SearchBar } from '@/components/SearchBar';
import { NameCard } from '@/components/NameCard';
import { CompletionModal } from '@/components/CompletionModal';
import { AllNamesModal } from '@/components/AllNamesModal';
import { useNames } from '@/hooks/useNames';
import { categories } from '@/data/names';

export default function Home() {
  const {
    currentName,
    currentIndex,
    totalNames,
    progressPercentage,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    searchSuggestions,
    highlightSearchTerm,
    goToNameById,
    nextName,
    previousName,
    randomName,
    restartJourney,
    toggleBookmark,
    isBookmarked,
    allNames
  } = useNames();

  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [showAllNamesModal, setShowAllNamesModal] = useState(false);

  const handleNext = () => {
    const isCompleted = nextName();
    if (isCompleted) {
      setShowCompletionModal(true);
    }
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-mint via-cream to-mint">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-teal-500/10 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, var(--teal-primary), var(--teal-secondary))' }}
              >
                <i className="fas fa-moon text-white text-lg"></i>
              </div>
              <div>
                <h1 
                  className="text-xl font-bold"
                  style={{ color: 'var(--teal-primary)' }}
                >
                  أسماء الله الحسنى
                </h1>
                <p className="text-sm text-gray-600">99 Beautiful Names of Allah</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                className="p-2 text-gray-500 hover:text-teal-600 transition-colors"
              >
                <i className="fas fa-bookmark"></i>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="p-2 text-gray-500 hover:text-teal-600 transition-colors"
              >
                <i className="fas fa-cog"></i>
              </Button>
            </div>
          </div>
          
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            searchSuggestions={searchSuggestions}
            onSelectSuggestion={goToNameById}
            highlightSearchTerm={highlightSearchTerm}
          />
        </div>
      </header>

      {/* Category Filter */}
      <div className="bg-white/50 backdrop-blur-sm border-b border-teal-500/5">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex space-x-3 overflow-x-auto scrollbar-hide">
            <Button
              onClick={() => handleCategoryChange('All Categories')}
              className={`text-white px-4 py-2 rounded-full text-sm whitespace-nowrap flex-shrink-0 shadow-sm transition-colors ${
                selectedCategory === 'All Categories' 
                  ? 'opacity-100' 
                  : 'opacity-70 hover:opacity-90'
              }`}
              style={{ background: 'linear-gradient(135deg, var(--teal-primary), var(--teal-secondary))' }}
            >
              All Categories
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => handleCategoryChange(category)}
                variant="ghost"
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap flex-shrink-0 transition-colors border ${
                  selectedCategory === category
                    ? 'bg-teal-50 text-teal-700 border-teal-300'
                    : 'bg-white text-teal-600 border-teal-200 hover:bg-teal-50'
                }`}
              >
                {category.replace(' Name', '').replace(' Names', '')}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-2xl mx-auto px-4 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Progress</span>
            <span 
              className="text-sm font-medium"
              style={{ color: 'var(--teal-primary)' }}
            >
              {currentIndex + 1} of {totalNames}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="h-2 rounded-full transition-all duration-500"
              style={{ 
                width: `${progressPercentage}%`,
                background: 'linear-gradient(90deg, var(--teal-primary), var(--gold))'
              }}
            />
          </div>
        </div>

        {/* Name Card */}
        <NameCard
          name={currentName}
          onBookmark={() => toggleBookmark()}
          isBookmarked={isBookmarked()}
        />

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            onClick={previousName}
            disabled={currentIndex === 0}
            className="flex items-center space-x-2 bg-white px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <i 
              className="fas fa-chevron-left"
              style={{ color: 'var(--teal-primary)' }}
            ></i>
            <span 
              className="font-medium"
              style={{ color: 'var(--teal-primary)' }}
            >
              Previous
            </span>
          </Button>

          <div className="flex items-center space-x-4">
            <Button
              onClick={randomName}
              className="p-3 rounded-full transition-colors"
              style={{ 
                backgroundColor: 'var(--gold)20',
                color: 'var(--gold)'
              }}
            >
              <i className="fas fa-random"></i>
            </Button>
            <Button
              onClick={() => setShowAllNamesModal(true)}
              className="p-3 rounded-full transition-colors"
              style={{ 
                backgroundColor: 'var(--teal-primary)20',
                color: 'var(--teal-primary)'
              }}
            >
              <i className="fas fa-list"></i>
            </Button>
          </div>

          <Button
            onClick={handleNext}
            className="flex items-center space-x-2 bg-white px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all"
          >
            <span 
              className="font-medium"
              style={{ color: 'var(--teal-primary)' }}
            >
              Next
            </span>
            <i 
              className="fas fa-chevron-right"
              style={{ color: 'var(--teal-primary)' }}
            ></i>
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer 
        className="border-t mt-16"
        style={{ 
          backgroundColor: 'var(--teal-primary)05',
          borderColor: 'var(--teal-primary)10'
        }}
      >
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <div className="mb-4">
            <p className="text-gray-600 mb-2">
              Built with ❤️ by <span 
                className="font-medium"
                style={{ color: 'var(--teal-primary)' }}
              >
                Zoyeb Batliwala
              </span> from India
            </p>
            <p className="text-sm text-gray-600">
              Seeking prayers from fellow believers 🤲
            </p>
          </div>
          
          <div 
            className="arabic-text text-xl mb-2"
            style={{ color: 'var(--teal-primary)' }}
          >
            رَبَّنَا تَقَبَّلْ مِنَّا إِنَّكَ أَنتَ السَّمِيعُ الْعَلِيمُ
          </div>
          <p className="text-sm text-gray-600">
            "Our Lord, accept this from us. Indeed You are the Hearing, the Knowing."
          </p>
        </div>
      </footer>

      {/* Modals */}
      <CompletionModal
        isOpen={showCompletionModal}
        onClose={() => setShowCompletionModal(false)}
        onRestart={restartJourney}
      />

      <AllNamesModal
        isOpen={showAllNamesModal}
        onClose={() => setShowAllNamesModal(false)}
        names={allNames}
        onSelectName={goToNameById}
      />
    </div>
  );
}
