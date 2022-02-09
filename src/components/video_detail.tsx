import React from "react";
import { useSelector } from "react-redux";
import { getCurrentVideo } from "../redux/selectors/videos";

const VideoDetail: React.FC = () => {
  const video = useSelector(getCurrentVideo);

  if (!video) {
    return <div>Loading...</div>;
  }

  const url = `https://www.youtube.com/embed/${video.id}`;

  return (
    <div className="video-detail">
      <div className="embed-responsive embed-responsive-16by9">
        <iframe
          title={video.title}
          className="embed-responsive-item"
          src={url}
        />
      </div>
      <div className="details">
        <h5>{video.title}</h5>
        <div>{video.description}</div>
      </div>
    </div>
  );
};

export default VideoDetail;
