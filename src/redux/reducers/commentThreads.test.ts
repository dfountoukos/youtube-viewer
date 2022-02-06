import { CommentThreadActionTypes } from "../actions/types";
import commentThreadsReducer, { CommentThreadsState } from "./commentThreads";
import { updateCommentThreadsAction } from "../actions/commentThreads";
import { initialState } from "./commentThreads";

describe("commentThreads reducer", () => {
  const mockCommentThread = {
    id: "threadId",
    topLevelComment: {
      id: "tlCommentId",
      authorChannelUrl: "tlAuthorUrl",
      authorProfileImageUrl: "tlProfileImageUrl",
      authorDisplayName: "authorName",
      commentText: "comment text",
    },
    replies: [{}],
  };

  it("returns the existing state value when the action is not handled", () => {
    const action = { type: "NOT_HANDLED_ACTION" } as any;

    const actual = commentThreadsReducer(undefined, action);

    expect(actual).toEqual(initialState);
  });

  describe(`${CommentThreadActionTypes.UpdateCommentThreads}`, () => {
    it("updates the comment threads in state", () => {
      const testState: CommentThreadsState = [];

      const action = updateCommentThreadsAction([mockCommentThread]);

      const actual = commentThreadsReducer(testState, action);

      expect(actual).toEqual([mockCommentThread]);
    });

    it("does not update the comment threads in state when action payload is missing", () => {
      const testState: CommentThreadsState = [mockCommentThread];

      const action = updateCommentThreadsAction(undefined);

      const actual = commentThreadsReducer(testState, action);

      expect(actual).toEqual(testState);
    });
  });
});
