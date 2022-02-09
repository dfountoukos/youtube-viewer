import { YoutubeCommentThread } from "youtube.ts";
import { updateCommentThreadsPayloadTransformer } from "./commentThreads";

describe("commentThreads payload transformers", () => {
  describe("updateCommentThreadsPayloadTransformer", () => {
    const mockCommentThread: YoutubeCommentThread = {
      kind: "threadKind",
      etag: "threadEtag",
      id: "threadId",
      canReply: true,
      totalReplyCount: 0,
      isPublic: true,
      snippet: {
        videoId: "videoId",
        topLevelComment: {
          id: "tlCommentId",
          kind: "tlCommentKind",
          etag: "tlCommentEtag",
          snippet: {
            authorChannelUrl: "tlAuthorUrl",
            authorProfileImageUrl: "tlProfileImageUrl",
            authorDisplayName: "authorName",
            authorChannelId: {
              value: "authorChannelId",
            },
            textOriginal: "comment text",
            textDisplay: "comment text",
            videoId: "videoId",
            canRate: true,
            viewerRating: "rating",
            likeCount: 0,
            publishedAt: "someDate",
            updatedAt: "someDate",
          },
        },
      },
    };

    it("generates payload when thread does not have replies", () => {
      const actual = updateCommentThreadsPayloadTransformer([
        mockCommentThread,
      ]);

      const expected = [
        {
          id: mockCommentThread.id,
          topLevelComment: {
            id: mockCommentThread.snippet.topLevelComment.id,
            authorChannelUrl:
              mockCommentThread.snippet.topLevelComment.snippet
                .authorChannelUrl,
            authorProfileImageUrl:
              mockCommentThread.snippet.topLevelComment.snippet
                .authorProfileImageUrl,
            authorDisplayName:
              mockCommentThread.snippet.topLevelComment.snippet
                .authorDisplayName,
            commentText:
              mockCommentThread.snippet.topLevelComment.snippet.textOriginal,
          },
          replies: [],
        },
      ];

      expect(actual).toEqual(expected);
    });

    it("generates payload when thread has replies", () => {
      const replyComment = {
        id: "replyCommentId",
        kind: "replyCommentKind",
        etag: "replyCommentEtag",
        snippet: {
          authorChannelUrl: "replyAuthorUrl",
          authorProfileImageUrl: "replyProfileImageUrl",
          authorDisplayName: "replyAuthorName",
          authorChannelId: {
            value: "replyAuthorChannelId",
          },
          textOriginal: "comment text",
          textDisplay: "comment text",
          videoId: "videoId",
          canRate: true,
          viewerRating: "rating",
          likeCount: 0,
          publishedAt: "someDate",
          updatedAt: "someDate",
        },
      };

      const inputThread: YoutubeCommentThread = {
        ...mockCommentThread,
        replies: {
          comments: [replyComment],
        },
      };
      const actual = updateCommentThreadsPayloadTransformer([inputThread]);

      const expected = [
        {
          id: mockCommentThread.id,
          topLevelComment: {
            id: mockCommentThread.snippet.topLevelComment.id,
            authorChannelUrl:
              mockCommentThread.snippet.topLevelComment.snippet
                .authorChannelUrl,
            authorProfileImageUrl:
              mockCommentThread.snippet.topLevelComment.snippet
                .authorProfileImageUrl,
            authorDisplayName:
              mockCommentThread.snippet.topLevelComment.snippet
                .authorDisplayName,
            commentText:
              mockCommentThread.snippet.topLevelComment.snippet.textOriginal,
          },
          replies: [
            {
              id: replyComment.id,
              authorChannelUrl: replyComment.snippet.authorChannelUrl,
              authorProfileImageUrl: replyComment.snippet.authorProfileImageUrl,
              authorDisplayName: replyComment.snippet.authorDisplayName,
              commentText: replyComment.snippet.textOriginal,
            },
          ],
        },
      ];

      expect(actual).toEqual(expected);
    });
  });
});
