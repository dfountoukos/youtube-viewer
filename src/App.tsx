import React, { useEffect, useState } from "react";
import _ from "lodash";
import SearchBar from "./components/search_bar";
import VideoCommentList from "./components/video_comment_list";
import VideoDetail from "./components/video_detail";
import VideoList from "./components/video_list";
import { youtubeSearch } from "services/youtube";
import { YoutubeVideoSearchItem } from "youtube.ts";

const App = () => {
  const [videos, setVideos] = useState<Array<YoutubeVideoSearchItem>>([]);
  const [selectedVideo, setSelectedVideo] = useState<YoutubeVideoSearchItem>();

  useEffect(() => {
    videoSearch("liverpool");
  }, []);

  const videoSearch = async (term: string) => {
    const videos = await youtubeSearch(term);

    setVideos(videos);
    setSelectedVideo(videos[0]);
  };

  const debouncedVideoSearch = _.debounce((term: string) => {
    videoSearch(term);
  }, 300);

  return (
    <div>
      <SearchBar onSearchTermChange={debouncedVideoSearch} />
      <div className="col-md-8">
        <div className="m-b-2">
          <VideoDetail video={selectedVideo} />
        </div>
        <VideoCommentList videoId={selectedVideo?.id.videoId} />
      </div>
      <div className="col-md-4">
        <VideoList
          onVideoSelect={(selectedVideo) => setSelectedVideo(selectedVideo)}
          videos={videos}
        />
      </div>
    </div>
  );
};

export default App;
