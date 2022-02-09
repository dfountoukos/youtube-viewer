import { RootState } from "../redux/store";
import { renderWithRedux } from "../testUtils";
import VideoList from "./video_list";

describe("VideoList", () => {
  it("renders a list of videos when they exist in state", () => {
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

    const initialState: RootState = {
      videos: {
        byId: {
          [mockVideo1.id]: mockVideo1,
          [mockVideo2.id]: mockVideo2,
        },
        allIds: [mockVideo1.id, mockVideo2.id],
        selectedVideoId: mockVideo1.id,
      },
      commentThreads: [],
    };

    const { getAllByRole } = renderWithRedux(<VideoList />, {
      initialState,
    });

    const videoThumbnails = getAllByRole("img");

    expect(videoThumbnails).toHaveLength(2);
  });

  it("renders an empty list when no videos exist in state", () => {
    const initialState: RootState = {
      videos: {
        byId: {},
        allIds: [],
        selectedVideoId: "",
      },
      commentThreads: [],
    };
    const { queryAllByRole } = renderWithRedux(<VideoList />, {
      initialState,
    });

    const videoThumbnails = queryAllByRole("img");

    expect(videoThumbnails).toHaveLength(0);
  });
});
