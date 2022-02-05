import React from "react";
import VideoListItem from "./video_list_item";
import { YoutubeVideoSearchItem } from "youtube.ts";

interface VideoListProps {
  videos: Array<YoutubeVideoSearchItem>;
  onVideoSelect: (video: YoutubeVideoSearchItem) => void;
}

const VideoList: React.FC<VideoListProps> = ({ videos, onVideoSelect }) => {
  const videoItems = videos.map((video) => {
    return (
      <VideoListItem
        onVideoSelect={onVideoSelect}
        key={video.etag}
        video={video}
      />
    );
  });

  return <ul className="list-group">{videoItems}</ul>;
};

export default VideoList;
