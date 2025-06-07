import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  searchSuggestions: any[];
  onSelectSuggestion: (nameNumber: number) => void;
  highlightSearchTerm: (text: string, term: string) => string;
}

export function SearchBar({
  searchQuery,
  onSearchChange,
  searchSuggestions,
  onSelectSuggestion,
  highlightSearchTerm
}: SearchBarProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onSearchChange(value);
    setShowSuggestions(value.length >= 2);
  };

  const handleSuggestionClick = (nameNumber: number) => {
    onSelectSuggestion(nameNumber);
    setShowSuggestions(false);
    onSearchChange('');
  };

  const clearSearch = () => {
    onSearchChange('');
    setShowSuggestions(false);
  };

  return (
    <div className="relative">
      <div className="relative">
        <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
        <Input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={() => setShowSuggestions(searchQuery.length >= 2)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          placeholder="Search by name, transliteration, or meaning..."
          className="w-full pl-12 pr-20 py-3 bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-base"
        />
        {searchQuery && (
          <Button
            onClick={clearSearch}
            variant="ghost"
            size="sm"
            className="absolute right-16 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 h-8 w-8 p-0"
          >
            <i className="fas fa-times"></i>
          </Button>
        )}
        <Button
          className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1.5 rounded-full text-sm"
          style={{ backgroundColor: 'var(--teal-primary)' }}
        >
          Search
        </Button>
      </div>

      {/* Search Suggestions Dropdown */}
      {showSuggestions && searchSuggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg mt-2 shadow-lg max-h-64 overflow-y-auto z-50">
          {searchSuggestions.map((result) => (
            <div
              key={result.number}
              onClick={() => handleSuggestionClick(result.number)}
              className="p-3 cursor-pointer border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
            >
              <div className="flex justify-between items-center">
                <div>
                  <span 
                    className="font-medium"
                    style={{ color: 'var(--teal-primary)' }}
                    dangerouslySetInnerHTML={{ 
                      __html: highlightSearchTerm(result.transliteration, searchQuery) 
                    }}
                  />
                  <span 
                    className="text-sm text-gray-600 ml-2"
                    dangerouslySetInnerHTML={{ 
                      __html: highlightSearchTerm(result.translationEn, searchQuery) 
                    }}
                  />
                </div>
                <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                  #{result.number}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
