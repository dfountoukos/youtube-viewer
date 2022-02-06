import { VideoAction } from "../actions/videos";
import { VideosActionTypes } from "../actions/types";

// TODO move types to another file

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
      return { ...state, selectedVideoId: action.payload?.id };
    default:
      return state;
  }
};

export default videosReducer;
