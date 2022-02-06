import React from "react";
import { useDispatch } from "react-redux";
import { setSelectedVideoIdAction } from "redux/actions/videos";

interface VideoListItemProps {
  video: Video;
}

const VideoListItem: React.FC<VideoListItemProps> = ({ video }) => {
  const dispatch = useDispatch();
  const onVideoSelect = () =>
    dispatch(setSelectedVideoIdAction({ id: video.id }));
  
    return (
    <li onClick={onVideoSelect} className="list-group-item">
      <div className="video-list media">
        <div className="media-left">
          <img
            className="media-object"
            alt="video thumbnail"
            src={video.thumbnailUrl}
          />
        </div>
        <div className="media-body">
          <div className="media-heading">{video.title}</div>
        </div>
      </div>
    </li>
  );
};

export default VideoListItem;
