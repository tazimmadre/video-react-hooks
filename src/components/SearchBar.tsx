import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import youtube from '../apis/youtube';

interface SearchBarProps {
  onFormSubmit: (term: string) => void;
  darkMode: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onFormSubmit, darkMode }) => {
  const [term, setTerm] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (term.trim()) {
        try {
          const response = await youtube.get('/search', {
            params: {
              part: 'snippet',
              maxResults: 5,
              q: term,
              type: 'video'
            }
          });
          setSuggestions(response.data.items.map((item: any) => item.snippet.title));
        } catch (error) {
          console.error('Error fetching suggestions:', error);
        }
      } else {
        setSuggestions([]);
      }
    };

    const debounceTimer = setTimeout(() => {
      fetchSuggestions();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [term]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFormSubmit(term);
    setShowSuggestions(false);
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl">
      <form onSubmit={onSubmit} className="flex items-center w-full">
        <div className="relative w-full">
          <input
            type="text"
            value={term}
            onChange={(e) => {
              setTerm(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            placeholder="Search videos..."
            className={`w-full px-4 py-2 pl-10 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent ${darkMode
              ? 'bg-gray-800 border-gray-700 text-white'
              : 'bg-gray-100 border-gray-300 text-black'
              }`}
          />
          <Search className={`absolute left-3 top-2.5 h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
        </div>
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <div className={`absolute w-full mt-1 py-2 rounded-lg shadow-lg z-50 ${darkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              onClick={() => {
                setTerm(suggestion);
                onFormSubmit(suggestion);
                setShowSuggestions(false);
              }}
              className={`px-4 py-2 cursor-pointer ${darkMode
                ? 'hover:bg-gray-700'
                : 'hover:bg-gray-100'
                }`}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;