import { Dispatch } from "redux";
import { VideosState } from "../reducers/videos";
import { youtubeSearch } from "../../services/youtube";
import { VideosActionTypes } from "./types";
import { actionCreator } from "./utils";
import { updateVideosPayloadTransformer } from "./payloadTransformers/videos";

export const updateVideosAction = (payload: VideosState) =>
  actionCreator(VideosActionTypes.UpdateVideos, payload);

export const setSelectedVideoIdAction = (payload: { id: string }) =>
  actionCreator(VideosActionTypes.SetSelectedVideoId, payload);

export const searchVideos = (term: string) => async (dispatch: Dispatch) => {
  const videos = await youtubeSearch(term);

  dispatch(updateVideosAction(updateVideosPayloadTransformer(videos)));
};

export type VideoAction =
  | ReturnType<typeof updateVideosAction>
  | ReturnType<typeof setSelectedVideoIdAction>;
