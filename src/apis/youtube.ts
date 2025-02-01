import axios from 'axios';

const KEY='AIzaSyDrZ58j3o70-jWeS5plODY4j7g8rGmh0sI'; // Note: In production, use environment variables

export default axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  params: {
    part: 'snippet',
    maxResults: 10,
    key: KEY,
    type: 'video'
  }
});