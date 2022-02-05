import { ActionCreator } from "./types";

export const actionCreator: ActionCreator = (type, payload) => ({
  type,
  payload,
});
