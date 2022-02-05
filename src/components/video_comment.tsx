import React from 'react'

interface VideoCommentProps {
  authorChannelUrl: string;
  authorProfileImageUrl: string;
  authorDisplayName: string;
  commentText: string;
}

const VideoComment: React.FC<VideoCommentProps> = ({
  authorChannelUrl,
  authorProfileImageUrl,
  authorDisplayName,
  commentText,
  children,
}) => (
  <>
    <div className="media-left">
      <a href={authorChannelUrl}>
        <img
          className="media-object"
          src={authorProfileImageUrl}
          alt={authorDisplayName}
        />
      </a>
    </div>
    <div className="media-body">
      <h6 className="media-heading">{authorDisplayName}</h6>
      <span>{commentText}</span>
      {children}
    </div>
  </>
);

export default VideoComment