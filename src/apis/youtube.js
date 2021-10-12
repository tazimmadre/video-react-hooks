import axios from 'axios';

const KEY='AIzaSyDrZ58j3o70-jWeS5plODY4j7g8rGmh0sI';

export default axios.create({
  baseURL:'https://www.googleapis.com/youtube/v3',
  params:{
    part:'snippet',
    maxResults:10,
    type:'video',
    key:KEY
  }
})