import React,{useState,useEffect} from "react";
import youtube from "../apis/youtube";
import SearchBar from "./SearchBar";
import VideoList from "./VideoList";
import VideoDetail from "./VideoDetail";
import "./App.css";
const App=()=>{
  const [videos,setVideos]=useState([]);
  const [selectedVideo,setSelectedVideo]=useState(null);

  useEffect(()=>{
    onTermSubmit("trending");
  },[]);
  const onTermSubmit = async (term) => {
    const searchresponse = await youtube.get("/search", {
      params: {
        q: term,
      },
    });
    console.log(searchresponse.data.items[0]);
        setVideos(searchresponse.data.items);
    setSelectedVideo(searchresponse.data.items[0]);
  };

  return (
    <div className="main-div ui container">
      <SearchBar className="searchbar" onFormSubmit={onTermSubmit} />
      <div className="div-button">
        <button
          className="ui primary basic button b1"
          onClick={() => {
            onTermSubmit("Music");
          }}
        >
          Music
        </button>
        <button
          className="ui primary basic button b2"
          onClick={() => {
            onTermSubmit("Gaming");
          }}
        >
          Gaming
        </button>
        <button
          className="ui primary basic button b3"
          onClick={() => {
            onTermSubmit("News");
          }}
        >
          News
        </button>
        <button
          className="ui primary basic button b4"
          onClick={() => {
            onTermSubmit("Live");
          }}
        >
          Live
        </button>
        <hr></hr>
      </div>
      <div className="ui grid">
        <div className="ui row rower">
          <div className="eleven wide column">
            <VideoDetail className="videodetail" video={selectedVideo} />
          </div>
          <div className="five wide column">
            <VideoList
              className="videolist"
              onVideoSelect={setSelectedVideo}
              videos={videos}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
