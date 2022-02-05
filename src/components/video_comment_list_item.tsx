import React from "react";
import { YoutubeCommentThread } from "youtube.ts";
import VideoComment from "./video_comment";

interface VideoCommentListItemProps {
  thread: YoutubeCommentThread;
}

const VideoCommentListItem: React.FC<VideoCommentListItemProps> = ({
  thread,
}) => (
  <VideoComment
    authorChannelUrl={thread.snippet.topLevelComment.snippet.authorChannelUrl}
    authorProfileImageUrl={
      thread.snippet.topLevelComment.snippet.authorProfileImageUrl
    }
    authorDisplayName={thread.snippet.topLevelComment.snippet.authorDisplayName}
    commentText={thread.snippet.topLevelComment.snippet.textOriginal}
  >
    {(thread.replies?.comments || []).map((comment) => (
      <div className="media" key={comment.id}>
        <VideoComment
          authorChannelUrl={comment.snippet.authorChannelUrl}
          authorProfileImageUrl={comment.snippet.authorProfileImageUrl}
          authorDisplayName={comment.snippet.authorDisplayName}
          commentText={comment.snippet.textOriginal}
        />
      </div>
    ))}
  </VideoComment>
);

export default VideoCommentListItem;
