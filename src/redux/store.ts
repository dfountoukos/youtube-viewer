import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from "./reducers";

const composeEnhancers =
process.env.NODE_ENV === 'development'
  ? composeWithDevTools({
      name: 'youtube-viewer',
      trace: true,
      traceLimit: 25,
    })
  : compose;

const configureStore = () =>
  createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default configureStore;
