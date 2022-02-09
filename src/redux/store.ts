import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from "./reducers";

const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? composeWithDevTools({
        name: "youtube-viewer",
        trace: true,
        traceLimit: 25,
      })
    : compose;

export const configureStore = (initialState?: Record<string, any>) =>
  createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk))
  );

const store = configureStore();

export type RootState = ReturnType<typeof store.getState>;

export default store;
