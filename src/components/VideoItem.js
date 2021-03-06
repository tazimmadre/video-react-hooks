import React,{useEffect, useState} from "react";
import "./VideoItem.css";
const VideoItem = ({ video, onVideoSelect }) => {
  const [live,setlive]=useState('');
  useEffect(() => {
    //   setDate(video.snippet.publishTime);
    // const datey=new Date(date);
    if (video.snippet.liveBroadcastContent === "live") {
      setlive(" Live");
    } else setlive("");
  }, [video.snippet.liveBroadcastContent]);
  return (
    <div
      onClick={() => {
        onVideoSelect(video);
      }}
      className="video-item item"
    >
      <img
        style={{ borderRadius: "10px" }}
        alt={video.snippet.title}
        className="ui image"
        src={video.snippet.thumbnails.medium.url}
      />
      <div className="content">
        <div className="header">{video.snippet.title}</div>
        <div className="description">{video.snippet.channelTitle}</div>
        <div className="footer" style={{color:'red'}}>{live}</div>
      </div>
    </div>
  );
};

export default VideoItem;
