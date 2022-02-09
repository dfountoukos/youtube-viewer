import { VideoAction } from "../actions/videos";
import { VideosActionTypes } from "../actions/types";

export interface VideosState {
  selectedVideoId: string;
  byId: Record<string, Video>;
  allIds: Array<string>;
}

export const initialState: VideosState = {
  selectedVideoId: "",
  byId: {},
  allIds: [],
};

const videosReducer = (
  state: VideosState = initialState,
  action: VideoAction
) => {
  switch (action.type) {
    case VideosActionTypes.UpdateVideos:
      return action.payload || state;
    case VideosActionTypes.SetSelectedVideoId:
      return {
        ...state,
        selectedVideoId: action.payload?.id || state.selectedVideoId,
      };
    default:
      return state;
  }
};

export default videosReducer;
