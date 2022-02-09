import React from "react";
import VideoListItem from "./video_list_item";
import { useSelector } from "react-redux";
import { getAllVideoIds } from "../redux/selectors/videos";

const VideoList: React.FC = () => {
  const videosIds = useSelector(getAllVideoIds);
  const videoItems = videosIds.map((videoId) => (
    <VideoListItem key={videoId} videoId={videoId} />
  ));

  return <ul className="list-group">{videoItems}</ul>;
};

export default VideoList;
