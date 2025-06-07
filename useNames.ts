import { useState, useMemo } from 'react';
import { namesData, type Name } from '@/data/names';

export function useNames() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [bookmarkedNames, setBookmarkedNames] = useState<number[]>([]);

  const currentName = namesData[currentIndex];
  const totalNames = namesData.length;
  const progressPercentage = ((currentIndex + 1) / totalNames) * 100;

  // Filter names based on search and category
  const filteredNames = useMemo(() => {
    let filtered = [...namesData];

    // Filter by category
    if (selectedCategory !== 'All Categories') {
      filtered = filtered.filter(name => name.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(name =>
        name.transliteration.toLowerCase().includes(query) ||
        name.translationEn.toLowerCase().includes(query) ||
        name.translationUrdu.includes(query) ||
        name.translationGujarati.includes(query) ||
        name.arabic.includes(query)
      );
    }

    return filtered;
  }, [searchQuery, selectedCategory]);

  // Search suggestions for autocomplete
  const searchSuggestions = useMemo(() => {
    if (searchQuery.length < 2) return [];
    
    const query = searchQuery.toLowerCase();
    return namesData
      .filter(name =>
        name.transliteration.toLowerCase().includes(query) ||
        name.translationEn.toLowerCase().includes(query)
      )
      .slice(0, 5);
  }, [searchQuery]);

  const goToName = (index: number) => {
    if (index >= 0 && index < totalNames) {
      setCurrentIndex(index);
    }
  };

  const goToNameById = (id: number) => {
    const index = namesData.findIndex(name => name.number === id);
    if (index !== -1) {
      setCurrentIndex(index);
    }
  };

  const nextName = () => {
    if (currentIndex < totalNames - 1) {
      setCurrentIndex(currentIndex + 1);
      return false; // Not completed
    }
    return true; // Completed all names
  };

  const previousName = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const randomName = () => {
    const randomIndex = Math.floor(Math.random() * totalNames);
    setCurrentIndex(randomIndex);
  };

  const restartJourney = () => {
    setCurrentIndex(0);
  };

  const toggleBookmark = (nameNumber?: number) => {
    const targetNumber = nameNumber || currentName.number;
    setBookmarkedNames(prev => 
      prev.includes(targetNumber)
        ? prev.filter(n => n !== targetNumber)
        : [...prev, targetNumber]
    );
  };

  const isBookmarked = (nameNumber?: number) => {
    const targetNumber = nameNumber || currentName.number;
    return bookmarkedNames.includes(targetNumber);
  };

  const highlightSearchTerm = (text: string, term: string) => {
    if (!term.trim()) return text;
    
    const regex = new RegExp(`(${term})`, 'gi');
    return text.replace(regex, '<span class="search-highlight">$1</span>');
  };

  return {
    // Current state
    currentName,
    currentIndex,
    totalNames,
    progressPercentage,
    
    // Search and filter
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    filteredNames,
    searchSuggestions,
    highlightSearchTerm,
    
    // Navigation
    goToName,
    goToNameById,
    nextName,
    previousName,
    randomName,
    restartJourney,
    
    // Bookmarks
    bookmarkedNames,
    toggleBookmark,
    isBookmarked,
    
    // Data
    allNames: namesData
  };
}
