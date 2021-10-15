import React,{useState,useEffect} from "react";
import youtube from "../apis/youtube";
import SearchBar from "./SearchBar";
import VideoList from "./VideoList";
import VideoDetail from "./VideoDetail";

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
    setVideos(searchresponse.data.items);
    setSelectedVideo(searchresponse.data.items[0]);
  };

  return (
    <div className="main-div ui container">
      <SearchBar className="searchbar" onFormSubmit={onTermSubmit} />
      <div className="ui grid">
        <div className="ui row">
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
