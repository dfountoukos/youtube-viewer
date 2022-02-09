import { VideosActionTypes } from "../actions/types";
import {
  setSelectedVideoIdAction,
  updateVideosAction,
} from "../actions/videos";
import videosReducer, { initialState, VideosState } from "./videos";

describe("videos reducer", () => {
  const mockVideo1 = {
    id: "videoId1",
    title: "videoTitle1",
    description: "videoDescription1",
    thumbnailUrl: "thumbnailUrl1",
  };

  const mockVideo2 = {
    id: "videoId2",
    title: "videoTitle2",
    description: "videoDescription2",
    thumbnailUrl: "thumbnailUrl2",
  };

  it("returns the existing state value when the action is not handled", () => {
    const action = { type: "NOT_HANDLED_ACTION" } as any;

    const actual = videosReducer(undefined, action);

    expect(actual).toEqual(initialState);
  });

  describe(`${VideosActionTypes.UpdateVideos}`, () => {
    it("updates the videos in state", () => {
      const testState: VideosState = initialState;

      const payload = {
        byId: {
          [mockVideo1.id]: mockVideo1,
        },
        allIds: [mockVideo1.id],
        selectedVideoId: mockVideo1.id,
      };

      const action = updateVideosAction(payload);

      const actual = videosReducer(testState, action);

      expect(actual).toEqual(payload);
    });

    it("does not update the videos state when action payload is missing", () => {
      const testState: VideosState = {
        byId: {
          [mockVideo1.id]: mockVideo1,
        },
        allIds: [mockVideo1.id],
        selectedVideoId: mockVideo1.id,
      };

      const action = updateVideosAction(undefined);

      const actual = videosReducer(testState, action);

      expect(actual).toEqual(testState);
    });
  });

  describe(`${VideosActionTypes.SetSelectedVideoId}`, () => {
    it("sets the selected video id to the payload value", () => {
      const testState: VideosState = {
        byId: {
          [mockVideo1.id]: mockVideo1,
          [mockVideo2.id]: mockVideo2,
        },
        allIds: [mockVideo1.id, mockVideo2.id],
        selectedVideoId: mockVideo1.id,
      };

      const expectedState: VideosState = {
        ...testState,
        selectedVideoId: mockVideo2.id,
      };

      const action = setSelectedVideoIdAction({ id: mockVideo2.id });

      const actual = videosReducer(testState, action);

      expect(actual).toEqual(expectedState);
    });

    it("does not update the selected video id state when action payload is missing", () => {
      const testState: VideosState = {
        byId: {
          [mockVideo1.id]: mockVideo1,
          [mockVideo2.id]: mockVideo2,
        },
        allIds: [mockVideo1.id, mockVideo2.id],
        selectedVideoId: mockVideo1.id,
      };

      const action = setSelectedVideoIdAction(undefined);

      const actual = videosReducer(testState, action);

      expect(actual).toEqual(testState);
    });
  });
});
