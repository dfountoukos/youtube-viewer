import {
  fetchVideoCommentThreads,
  updateCommentThreadsAction,
} from "./commentThreads";
import { CommentThreadActionTypes } from "./types";
import { youtubeComments } from "../../services/youtube";

jest.mock("../../services/youtube", () => ({
  youtubeComments: jest.fn(),
}));

describe("commentThreads actions", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  describe("updateCommentThreadsAction", () => {
    const createComment = (discriminator: string = "") => ({
      id: `commentId${discriminator}`,
      authorChannelUrl: `authorChannelUrl${discriminator}`,
      authorProfileImageUrl: `authorProfileImageUrl${discriminator}`,
      authorDisplayName: `authorDisplayName${discriminator}`,
      commentText: `commentText${discriminator}`,
    });

    it("creates action with payload", () => {
      const videoComment = createComment();
      const commentThread = {
        id: "threadId",
        topLevelComment: videoComment,
        replies: [],
      };
      const actual = updateCommentThreadsAction([commentThread]);

      const expected = {
        type: CommentThreadActionTypes.UpdateCommentThreads,
        payload: [commentThread],
      };

      expect(actual).toEqual(expected);
    });
  });

  describe("fetchVideoCommentThreads", () => {
    it("should dispatch updateCommentThreadsAction", async () => {
      const mockDispatch = jest.fn();
      const mockFetchResult = [];

      (youtubeComments as jest.Mocked<any>).mockImplementation(
        () => mockFetchResult
      );

      await fetchVideoCommentThreads("videoId")(mockDispatch);

      expect(mockDispatch).toHaveBeenCalledWith(
        updateCommentThreadsAction(mockFetchResult)
      );
    });
  });
});
