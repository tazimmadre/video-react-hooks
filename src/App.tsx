import React, { useState, useEffect } from "react";
import { Music, Gamepad, Newspaper, Radio, Flame, Film, Moon, Sun } from 'lucide-react';
import youtube from "./apis/youtube";
import SearchBar from "./components/SearchBar";
import VideoList from "./components/VideoList";
import VideoDetail from "./components/VideoDetail";

const App = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    onTermSubmit("trending");
  }, []);

  const onTermSubmit = async (term) => {
    try {
      const response = await youtube.get("/search", {
        params: {
          q: term,
        },
      });
      setVideos(response.data.items);
      setSelectedVideo(response.data.items[0]);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  const categories = [
    { icon: <Flame className="h-5 w-5" />, label: 'Trending', query: 'trending' },
    { icon: <Music className="h-5 w-5" />, label: 'Music', query: 'music' },
    { icon: <Gamepad className="h-5 w-5" />, label: 'Gaming', query: 'gaming' },
    { icon: <Film className="h-5 w-5" />, label: 'Movies', query: 'movies' },
    { icon: <Newspaper className="h-5 w-5" />, label: 'News', query: 'news' },
    { icon: <Radio className="h-5 w-5" />, label: 'Live', query: 'live' },
  ];

  const [activeCategory, setActiveCategory] = useState('Trending');

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} border-b`}>
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-red-600">YouTube Clone</span>
            </div>
            <SearchBar onFormSubmit={onTermSubmit} darkMode={darkMode} />
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`px-4 py-2 rounded-lg ${darkMode
                ? 'bg-gray-700 hover:bg-gray-600'
                : 'bg-gray-100 hover:bg-gray-200'
                }`}
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Categories */}
        <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.label}
              onClick={() => {
                onTermSubmit(category.query);
                setActiveCategory(category.label);
              }}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap transition-colors ${activeCategory === category.label
                ? 'bg-red-600 text-white'
                : darkMode
                  ? 'bg-gray-800 hover:bg-gray-700'
                  : 'bg-gray-100 hover:bg-gray-200'
                }`}
            >
              {category.icon}
              <span>{category.label}</span>
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <VideoDetail video={selectedVideo} darkMode={darkMode} />
          </div>
          <div className="lg:col-span-1">
            <VideoList onVideoSelect={setSelectedVideo} videos={videos} darkMode={darkMode} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;