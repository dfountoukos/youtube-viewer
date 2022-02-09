import { VideosActionTypes } from "./types";
import {
  searchVideos,
  setSelectedVideoIdAction,
  updateVideosAction,
} from "./videos";
import { youtubeSearch } from "../../services/youtube";

jest.mock("../../services/youtube", () => ({
  youtubeSearch: jest.fn(),
}));

describe("videos actions", () => {
  describe("updateVideosAction", () => {
    it("creates action with payload", () => {
      const payload = {
        byId: {},
        allIds: [],
        selectedVideoId: "",
      };

      const actual = updateVideosAction(payload);

      const expected = {
        type: VideosActionTypes.UpdateVideos,
        payload,
      };

      expect(actual).toEqual(expected);
    });
  });

  describe("setSelectedVideoIdAction", () => {
    it("creates action with payload", () => {
      const payload = { id: "videoId" };

      const actual = setSelectedVideoIdAction(payload);

      const expected = {
        type: VideosActionTypes.SetSelectedVideoId,
        payload,
      };

      expect(actual).toEqual(expected);
    });
  });

  describe("searchVideos", () => {
    it("should dispatch updateCommentThreadsAction", async () => {
      const mockDispatch = jest.fn();
      const mockFetchResult = [];

      (youtubeSearch as jest.Mocked<any>).mockImplementation(
        () => mockFetchResult
      );

      await searchVideos("searchTerm")(mockDispatch);

      expect(mockDispatch).toHaveBeenCalledWith(
        updateVideosAction({
          byId: {},
          allIds: [],
          selectedVideoId: "",
        })
      );
    });
  });
});
