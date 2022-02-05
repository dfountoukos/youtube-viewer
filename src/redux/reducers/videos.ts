import { VideoAction } from "../actions/videos";
import { VideosActionTypes } from "../actions/types";

const initialState = {
  videos: [],
};

const videosReducer = (state = initialState, action: VideoAction) => {
  switch (action.type) {
    case VideosActionTypes.UpdateVideos:
      return action.payload;
    default:
      return state;
  }
};

export default videosReducer;
