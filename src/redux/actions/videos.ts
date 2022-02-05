import { YoutubeVideoSearchItem } from "youtube.ts";
import { VideosActionTypes } from "./types";
import { actionCreator } from "./utils";

export const updateVideosAction = (payload: Array<YoutubeVideoSearchItem>) =>
  actionCreator(VideosActionTypes.UpdateVideos, payload);

export type VideoAction = ReturnType<typeof updateVideosAction>;
