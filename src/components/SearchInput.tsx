'use client';

import { useEffect, useState, useRef, KeyboardEvent } from 'react';

export interface SearchSuggestion {
  name: string;
  slug: string;
  aliases?: string[];
}

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  debounceMs?: number;
  className?: string;
  suggestions?: SearchSuggestion[];
  onSelectSuggestion?: (suggestion: SearchSuggestion) => void;
  maxSuggestions?: number;
}

export default function SearchInput({
  value,
  onChange,
  placeholder = 'Search...',
  debounceMs = 300,
  className = '',
  suggestions = [],
  onSelectSuggestion,
  maxSuggestions = 8,
}: SearchInputProps) {
  const [localValue, setLocalValue] = useState(value);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(localValue);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [localValue, debounceMs, onChange]);

  // Show suggestions when there's input and suggestions available
  useEffect(() => {
    if (localValue.trim() && suggestions.length > 0) {
      setShowSuggestions(true);
      setSelectedIndex(-1);
    } else {
      setShowSuggestions(false);
    }
  }, [localValue, suggestions.length]);

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const displayedSuggestions = suggestions.slice(0, maxSuggestions);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || displayedSuggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < displayedSuggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < displayedSuggestions.length) {
          const selected = displayedSuggestions[selectedIndex];
          handleSelectSuggestion(selected);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleSelectSuggestion = (suggestion: SearchSuggestion) => {
    setLocalValue(suggestion.name);
    onChange(suggestion.name);
    setShowSuggestions(false);
    setSelectedIndex(-1);
    onSelectSuggestion?.(suggestion);
  };

  return (
    <div className={`relative ${className}`}>
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <svg
          className="h-5 w-5 text-slate-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <input
        ref={inputRef}
        type="search"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="input-field block w-full pl-10 pr-3 py-3 text-[16px] rounded-lg sm:text-sm"
        aria-label="Search peptides"
        aria-autocomplete="list"
        aria-controls={showSuggestions ? 'search-suggestions' : undefined}
        aria-expanded={showSuggestions}
        role="combobox"
      />
      {localValue && (
        <button
          type="button"
          onClick={() => {
            setLocalValue('');
            setShowSuggestions(false);
          }}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500 hover:text-slate-300 transition-colors"
          aria-label="Clear search"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}

      {/* Autocomplete Dropdown */}
      {showSuggestions && displayedSuggestions.length > 0 && (
        <div
          ref={dropdownRef}
          id="search-suggestions"
          role="listbox"
          className="absolute z-50 w-full mt-2 bg-slate-800 border border-slate-700 rounded-lg shadow-xl max-h-96 overflow-y-auto"
        >
          {displayedSuggestions.map((suggestion, index) => (
            <button
              key={suggestion.slug}
              role="option"
              aria-selected={index === selectedIndex}
              onClick={() => handleSelectSuggestion(suggestion)}
              onMouseEnter={() => setSelectedIndex(index)}
              className={`w-full text-left px-4 py-3 transition-colors border-b border-slate-700 last:border-b-0 ${
                index === selectedIndex
                  ? 'bg-primary-600/20 text-primary-300'
                  : 'text-slate-200 hover:bg-slate-700/50'
              }`}
            >
              <div className="font-medium">{suggestion.name}</div>
              {suggestion.aliases && suggestion.aliases.length > 0 && (
                <div className="text-xs text-slate-400 mt-1">
                  Also known as: {suggestion.aliases.join(', ')}
                </div>
              )}
            </button>
          ))}
          {suggestions.length > maxSuggestions && (
            <div className="px-4 py-2 text-xs text-slate-400 bg-slate-900/50 text-center">
              {suggestions.length - maxSuggestions} more results...
            </div>
          )}
        </div>
      )}
    </div>
  );
}
