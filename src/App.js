import React, { useEffect, useState } from "react";
import _ from "lodash";
import YTSearch from "youtube-api-search";
import SearchBar from "./components/search_bar";
import VideoList from "./components/video_list";
import VideoDetail from "./components/video_detail";

const API_KEY = "AIzaSyCbcQMTPqAevOao2BQsQadm5SFTZljP2dM";

const App = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    videoSearch("liverpool");
  }, [])

  const videoSearch = (term) => {
    YTSearch({ key: API_KEY, term: term }, (videos) => {
      console.log("videos", videos);
      setVideos(videos)
      setSelectedVideo(videos[0])
    });
  }

  const debouncedVideoSearch = _.debounce((term) => {
    videoSearch(term);
  }, 300)

  return (
    <div>
      <SearchBar onSearchTermChange={debouncedVideoSearch} />
      <VideoDetail video={selectedVideo} />
      <VideoList
        onVideoSelect={(selectedVideo) => setSelectedVideo(selectedVideo)}
        videos={videos}
      />
    </div>
  );
}

export default App;