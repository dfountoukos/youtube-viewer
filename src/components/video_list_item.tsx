import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedVideoIdAction } from "redux/actions/videos";
import { getVideoById } from "redux/selectors/videos";
import { RootState } from "redux/store";

interface VideoListItemProps {
  videoId: string;
}

const VideoListItem: React.FC<VideoListItemProps> = ({ videoId }) => {
  const dispatch = useDispatch();
  const onVideoSelect = () =>
    dispatch(setSelectedVideoIdAction({ id: videoId }));
  const video = useSelector<RootState, Video>((state) =>
    getVideoById(state, { videoId })
  );

  return (
    <li
      onClick={onVideoSelect}
      className="list-group-item"
      data-testid={videoId}
    >
      <div className="video-list media">
        <div className="media-left">
          <img
            className="media-object"
            alt={video.description}
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
