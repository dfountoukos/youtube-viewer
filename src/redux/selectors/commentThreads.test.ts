import { getCommentThreads } from "./commentThreads";
import { RootState } from "../store";
import { initialState as videosInitialState } from "../reducers/videos";
import { createComment } from "../../testUtils";

describe("commentThreads selectors", () => {
  describe("getCommentThreads", () => {
    it("it returns undefined when no comment threads exist in state", () => {
      const actual = getCommentThreads({});

      expect(actual).toBeUndefined();
    });

    it("it returns the array of comments existing in state", () => {
      const mockCommentThread = {
        id: "threadId",
        topLevelComment: createComment("tl"),
        replies: [],
      };

      const testState: RootState = {
        commentThreads: [mockCommentThread],
        videos: videosInitialState,
      };

      const actual = getCommentThreads(testState);

      expect(actual).toEqual([mockCommentThread]);
    });
  });
});
