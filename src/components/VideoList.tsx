import React from 'react';

interface Video {
  id: { videoId: string };
  snippet: {
    title: string;
    thumbnails: {
      medium: {
        url: string;
      };
    };
    channelTitle: string;
  };
}

interface VideoListProps {
  videos: Video[];
  onVideoSelect: (video: Video) => void;
  darkMode: boolean;
}

const VideoList: React.FC<VideoListProps> = ({ videos, onVideoSelect, darkMode }) => {
  const renderedVideos = videos.map((video) => (
    <div
      key={video.id.videoId}
      onClick={() => onVideoSelect(video)}
      className={`flex space-x-3 p-2 ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
        } rounded-lg cursor-pointer`}
    >
      <img
        src={video.snippet.thumbnails.medium.url}
        alt={video.snippet.title}
        className="w-40 h-24 object-cover rounded-lg"
      />
      <div className="flex flex-col">
        <h3 className="font-medium line-clamp-2">{video.snippet.title}</h3>
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
          {video.snippet.channelTitle}
        </p>
      </div>
    </div>
  ));

  return <div className="flex flex-col space-y-2">{renderedVideos}</div>;
}

export default VideoList;