import { initialState as videosInitialState } from "../reducers/videos";
import { RootState } from "../store";
import { getAllVideoIds, getCurrentVideo, getSelectedVideoId } from "./videos";
describe("videos selectors", () => {
  const initialState: RootState = {
    videos: videosInitialState,
    commentThreads: [],
  };
  describe("getSelectedVideoId", () => {
    it("returns the selected video id", () => {
      const testState: RootState = {
        ...initialState,
        videos: {
          ...initialState.videos,
          selectedVideoId: "videoId",
        },
      };

      const actual = getSelectedVideoId(testState);

      expect(actual).toBe("videoId");
    });
  });

  describe("getCurrentVideo", () => {
    it("returns the currently selected video", () => {
      const mockVideo = {
        id: "videoId",
        title: "videoTitle",
        description: "videoDescription",
        thumbnailUrl: "thumbnailUrl",
      };

      const testState: RootState = {
        ...initialState,
        videos: {
          byId: {
            videoId: mockVideo,
          },
          allIds: [mockVideo.id],
          selectedVideoId: mockVideo.id,
        },
      };

      const actual = getCurrentVideo(testState);

      expect(actual).toEqual(mockVideo);
    });

    it("returns undefined when the selectedVideoId does not match any of the videos in state", () => {
      const mockVideo = {
        id: "videoId",
        title: "videoTitle",
        description: "videoDescription",
        thumbnailUrl: "thumbnailUrl",
      };

      const testState: RootState = {
        ...initialState,
        videos: {
          byId: {
            [mockVideo.id]: mockVideo,
          },
          allIds: [mockVideo.id],
          selectedVideoId: "otherVideoId",
        },
      };

      const actual = getCurrentVideo(testState);

      expect(actual).toBeUndefined();
    });
  });

  describe("getAllVideos", () => {
    it("returns an array with all available video ids in state", () => {
      const mockVideo = {
        id: "videoId",
        title: "videoTitle",
        description: "videoDescription",
        thumbnailUrl: "thumbnailUrl",
      };

      const testState: RootState = {
        ...initialState,
        videos: {
          byId: {
            [mockVideo.id]: mockVideo,
          },
          allIds: [mockVideo.id],
          selectedVideoId: mockVideo.id,
        },
      };

      const actual = getAllVideoIds(testState);

      expect(actual).toEqual([mockVideo.id]);
    });

    it("returns an empty array when allVideos array is undefined", () => {
      const mockVideo = {
        id: "videoId",
        title: "videoTitle",
        description: "videoDescription",
        thumbnailUrl: "thumbnailUrl",
      };

      const testState: RootState = {
        ...initialState,
        videos: {
          byId: {},
          allIds: undefined,
          selectedVideoId: mockVideo.id,
        },
      };

      const actual = getAllVideoIds(testState);

      expect(actual).toEqual([]);
    });

    it("returns an empty array when no videos exist", () => {
      const testState: RootState = {
        ...initialState,
        videos: {
          byId: {},
          allIds: [],
          selectedVideoId: "",
        },
      };

      const actual = getAllVideoIds(testState);

      expect(actual).toEqual([]);
    });
  });
});
