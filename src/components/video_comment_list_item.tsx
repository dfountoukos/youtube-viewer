import React from "react";
import { YoutubeCommentThread } from "youtube.ts";

interface VideoCommentListItemProps {
  thread: YoutubeCommentThread;
}

const VideoCommentListItem: React.FC<VideoCommentListItemProps> = ({
  thread,
}) => (
  <>
    <div className="media-left">
      <a href={thread.snippet.topLevelComment.snippet.authorChannelUrl}>
        <img className="media-object" src={thread.snippet.topLevelComment.snippet.authorProfileImageUrl} alt={thread.snippet.topLevelComment.snippet.authorDisplayName} />
      </a>
    </div>
    <div className="media-body">
      <h6 className="media-heading">{thread.snippet.topLevelComment.snippet.authorDisplayName}</h6>
      <span>{thread.snippet.topLevelComment.snippet.textOriginal}</span>
    </div>
  </>
);

export default VideoCommentListItem;
