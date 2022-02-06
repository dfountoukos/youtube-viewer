import { CommentThreadActionTypes } from "redux/actions/types";
import { CommentThreadsAction } from "../actions/commentThreads";

export type CommentThreadsState = Array<VideoCommentThread>;

export const initialState: CommentThreadsState = [];

const commentThreadsReducer = (
  state: CommentThreadsState = initialState,
  action: CommentThreadsAction
) => {
  switch (action.type) {
    case CommentThreadActionTypes.UpdateCommentThreads:
      return action.payload || state;
    default:
      return state;
  }
};

export default commentThreadsReducer;
