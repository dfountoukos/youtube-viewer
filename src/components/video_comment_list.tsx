import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideoCommentThreads } from "../redux/actions/commentThreads";
import { getSelectedVideoId } from "../redux/selectors/videos";
import { getCommentThreads } from "../redux/selectors/commentThreads";
import VideoCommentListItem from "./video_comment_list_item";

const VideoCommentList: React.FC = () => {
  const dispatch = useDispatch();
  const selectedVideoId = useSelector(getSelectedVideoId);
  const commentThreads = useSelector(getCommentThreads);

  useEffect(() => {
    selectedVideoId && dispatch(fetchVideoCommentThreads(selectedVideoId));
  }, [dispatch, selectedVideoId]);

  return (
    <>
      <h4>Comments</h4>
      {!selectedVideoId && <p>Loading comments...</p>}

      {selectedVideoId && !commentThreads.length && (
        <p>No comments exist for this video yet</p>
      )}

      {!!commentThreads.length && (
        <ul className="media-list">
          {commentThreads.map((thread) => (
            <li className="media" key={thread.id}>
              <VideoCommentListItem thread={thread} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default VideoCommentList;
