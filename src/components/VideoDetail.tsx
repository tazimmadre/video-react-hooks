import React from 'react';
import { ThumbsUp, MessageCircle, Share2 } from 'lucide-react';

interface Video {
  id: { videoId: string };
  snippet: {
    title: string;
    description: string;
    channelTitle: string;
  };
}

interface VideoDetailProps {
  video: Video | null;
  darkMode: boolean;
}

const VideoDetail: React.FC<VideoDetailProps> = ({ video, darkMode }) => {
  if (!video) {
    return <div className={`animate-pulse h-96 ${darkMode ? 'bg-gray-800' : 'bg-gray-200'} rounded-lg`}></div>;
  }

  const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`;

  return (
    <div className="flex flex-col space-y-4">
      <div className="relative pt-[56.25%] bg-black rounded-lg overflow-hidden">
        <iframe
          src={videoSrc}
          title={video.snippet.title}
          className="absolute top-0 left-0 w-full h-full"
          allowFullScreen
        />
      </div>

      <div className="space-y-4">
        <h1 className="text-xl font-bold">{video.snippet.title}</h1>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`h-10 w-10 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
            <span className="font-medium">{video.snippet.channelTitle}</span>
          </div>

          <div className="flex items-center space-x-4">
            <button className={`flex items-center space-x-2 px-4 py-2 rounded-full ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
              }`}>
              <ThumbsUp className="h-5 w-5" />
              <span>Like</span>
            </button>
            <button className={`flex items-center space-x-2 px-4 py-2 rounded-full ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
              }`}>
              <MessageCircle className="h-5 w-5" />
              <span>Comment</span>
            </button>
            <button className={`flex items-center space-x-2 px-4 py-2 rounded-full ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
              }`}>
              <Share2 className="h-5 w-5" />
              <span>Share</span>
            </button>
          </div>
        </div>

        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} whitespace-pre-line`}>
          {video.snippet.description}
        </p>
      </div>
    </div>
  );
}

export default VideoDetail;