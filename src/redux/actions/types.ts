export type Action<T extends string, P> = {
  type: T;
  payload?: P;
};

export type ActionCreator = <T extends string, P>(
  type: T,
  payload?: P
) => Action<T, P>;

export enum VideosActionTypes {
  UpdateVideos = "VIDEOS/UPDATE_VIDEOS",
  SetSelectedVideoId = "VIDEOS/SET_SELECTED_VIDEO_ID",
}

export enum CommentThreadActionTypes {
  UpdateCommentThreads = "COMMENT_THREADS/UPDATE_COMMENT_THREADS",
}
