import { RootState } from "../store";

export const getSelectedVideoId = ({ videos }: RootState) =>
  videos.selectedVideoId;

export const getCurrentVideo = ({ videos }: RootState) =>
  videos.byId[videos.selectedVideoId];

export const getVideoById = (
  { videos }: RootState,
  { videoId }: { videoId: string }
) => videos.byId[videoId];

export const getAllVideoIds = ({ videos }: RootState) => videos.allIds ?? [];
