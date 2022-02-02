import React from "react";
import VideoListItem from "./video_list_item";

interface VideoListProps {
  videos: Array<YoutubeVideo>
  onVideoSelect: (video: YoutubeVideo) => void
}

const VideoList:React.FC<VideoListProps> = ({ videos, onVideoSelect }) => {
  const videoItems = videos.map((video) => {
    return (
      <VideoListItem
        onVideoSelect={onVideoSelect}
        key={video.etag}
        video={video}
      />
    );
  });

  return <ul className="col-md-4 list-group">{videoItems}</ul>;
};

export default VideoList;
