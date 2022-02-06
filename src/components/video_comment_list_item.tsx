import React from "react";
import VideoComment from "./video_comment";

interface VideoCommentListItemProps {
  thread: VideoCommentThread;
}

const VideoCommentListItem: React.FC<VideoCommentListItemProps> = ({
  thread,
}) => (
  <VideoComment
    authorChannelUrl={thread.topLevelComment.authorChannelUrl}
    authorProfileImageUrl={thread.topLevelComment.authorProfileImageUrl}
    authorDisplayName={thread.topLevelComment.authorDisplayName}
    commentText={thread.topLevelComment.commentText}
  >
    {thread.replies.map((comment) => (
      <div className="media" key={comment.id}>
        <VideoComment
          authorChannelUrl={comment.authorChannelUrl}
          authorProfileImageUrl={comment.authorProfileImageUrl}
          authorDisplayName={comment.authorDisplayName}
          commentText={comment.commentText}
        />
      </div>
    ))}
  </VideoComment>
);

export default VideoCommentListItem;
