import { initialState as videosInitialState } from "../reducers/videos";
import { RootState } from "../store";
import { getAllVideos, getCurrentVideo, getSelectedVideoId } from "./videos";
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
          allIds: ["videoId"],
          selectedVideoId: "videoId",
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
    it("returns an array with all available videos in state", () => {
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

      const actual = getAllVideos(testState);

      expect(actual).toEqual([mockVideo]);
    });

    it("returns an empty array when videos by id is undefined", () => {
      const mockVideo = {
        id: "videoId",
        title: "videoTitle",
        description: "videoDescription",
        thumbnailUrl: "thumbnailUrl",
      };

      const testState: RootState = {
        ...initialState,
        videos: {
          byId: undefined,
          allIds: [mockVideo.id],
          selectedVideoId: mockVideo.id,
        },
      };

      const actual = getAllVideos(testState);

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

      const actual = getAllVideos(testState);

      expect(actual).toEqual([]);
    });
  });
});
