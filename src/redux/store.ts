import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from "./reducers";
import { VideosState } from "./reducers/videos";
import { CommentThreadsState } from "./reducers/commentThreads";

const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? composeWithDevTools({
        name: "youtube-viewer",
        trace: true,
        traceLimit: 25,
      })
    : compose;

const configureStore = () =>
  createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

const store = configureStore();

export type RootState = {
  videos: VideosState
  commentThreads: CommentThreadsState
}


export default store;
