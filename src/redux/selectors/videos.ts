import { RootState } from "../store";

export const getSelectedVideoId = ({ videos }: RootState) =>
  videos.selectedVideoId;

export const getCurrentVideo = ({ videos }: RootState) =>
  videos.byId[videos.selectedVideoId];

export const getAllVideos = ({ videos }: RootState) =>
  Object.values(videos.byId ?? []);
