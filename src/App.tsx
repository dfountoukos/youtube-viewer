import React from "react";
import SearchBar from "./components/search_bar";
import VideoCommentList from "./components/video_comment_list";
import VideoDetail from "./components/video_detail";
import VideoList from "./components/video_list";

const App = () => (
  <div>
    <SearchBar />
    <div className="col-md-8">
      <div className="m-b-2">
        <VideoDetail />
      </div>
      <VideoCommentList />
    </div>
    <div className="col-md-4">
      <VideoList />
    </div>
  </div>
);

export default App;
