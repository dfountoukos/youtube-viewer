export type Action<T extends string, P> = {
  type: T;
  payload?: P;
};

export type ActionCreator = <T extends string, P>(
  type: T,
  payload?: P
) => Action<T, P>;

export enum VideosActionTypes {
  UpdateVideos = "UPDATE_VIDEOS",
}
