import { Dispatch } from "redux";
import { CommentThreadsState } from "redux/reducers/commentThreads";
import { youtubeComments } from "services/youtube";
import { updateCommentThreadsPayloadTransformer } from "./payloadTransformers/commentThreads";
import { CommentThreadActionTypes } from "./types";
import { actionCreator } from "./utils";

export const updateCommentThreadsAction = (payload: CommentThreadsState) =>
  actionCreator(CommentThreadActionTypes.UpdateCommentThreads, payload);

export const fetchVideoCommentThreads =
  (videoId: string) => async (dispatch: Dispatch) => {
    const results = await youtubeComments(videoId);

    dispatch(
      updateCommentThreadsAction(
        updateCommentThreadsPayloadTransformer(results)
      )
    );
  };

export type CommentThreadsAction = ReturnType<
  typeof updateCommentThreadsAction
>;
