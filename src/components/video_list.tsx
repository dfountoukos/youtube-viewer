import React from "react";
import VideoListItem from "./video_list_item";
import { useSelector } from "react-redux";
import { getAllVideos } from "../redux/selectors/videos";

const VideoList: React.FC = () => {
  const videos = useSelector(getAllVideos);
  const videoItems = videos.map((video) => {
    return <VideoListItem key={video.id} video={video} />;
  });

  return <ul className="list-group">{videoItems}</ul>;
};

export default VideoList;
