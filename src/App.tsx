import React, { useEffect, useState } from "react";
import _ from "lodash";
import YTSearch from "youtube-api-search";
import SearchBar from "./components/search_bar";
import VideoList from "./components/video_list";
import VideoDetail from "./components/video_detail";

const API_KEY = "AIzaSyBwGseFWjTJ9wwGVpB-gB9_E3DoYFzmE-4";
// const API_KEY = "AIzaSyCbcQMTPqAevOao2BQsQadm5SFTZljP2dM" // provided by exercise;

const App = () => {
  const [videos, setVideos] = useState<Array<YoutubeVideo>>([]);
  const [selectedVideo, setSelectedVideo] = useState<YoutubeVideo>();

  useEffect(() => {
    videoSearch("liverpool");
  }, [])

  const videoSearch = (term: string) => {
    YTSearch({ key: API_KEY, term }, (videos) => {
      setVideos(videos)
      setSelectedVideo(videos[0])
    });
  }

  const debouncedVideoSearch = _.debounce((term: string) => {
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