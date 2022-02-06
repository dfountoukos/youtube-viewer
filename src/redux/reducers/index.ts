import { combineReducers } from "redux";
import videos from "./videos";
import commentThreads from "./commentThreads";

const rootReducer = combineReducers({
  videos,
  commentThreads,
});

export default rootReducer;
