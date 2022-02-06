import { YoutubeCommentThread } from "youtube.ts";

export const updateCommentThreadsPayloadTransformer = (
  threads: Array<YoutubeCommentThread>
) =>
  threads.map((thread) => ({
    id: thread.id,
    topLevelComment: {
      id: thread.snippet.topLevelComment.id,
      authorChannelUrl: thread.snippet.topLevelComment.snippet.authorChannelUrl,
      authorProfileImageUrl:
        thread.snippet.topLevelComment.snippet.authorProfileImageUrl,
      authorDisplayName:
        thread.snippet.topLevelComment.snippet.authorDisplayName,
      commentText: thread.snippet.topLevelComment.snippet.textOriginal,
    },
    replies: (thread.replies?.comments || []).map((comment) => ({
      id: comment.id,
      authorChannelUrl: comment.snippet.authorChannelUrl,
      authorProfileImageUrl: comment.snippet.authorProfileImageUrl,
      authorDisplayName: comment.snippet.authorDisplayName,
      commentText: comment.snippet.textOriginal,
    })),
  }));
