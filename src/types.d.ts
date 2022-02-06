interface Video {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
}

interface VideoComment {
  id: string;
  authorChannelUrl: string;
  authorProfileImageUrl: string;
  authorDisplayName: string;
  commentText: string;
}
interface VideoCommentThread {
  id: string;
  topLevelComment: VideoComment;
  replies: Array<VideoComment>;
}