import { RootState } from "../redux/store";
import { renderWithRedux } from "../testUtils";
import VideoDetail from "./video_detail";

describe("VideoDetail", () => {
  it("renders video and description", () => {
    const mockVideo = {
      id: "videoId",
      title: "videoTitle",
      description: "videoDescription",
      thumbnailUrl: "thumbnailUrl",
    };

    const initialState: RootState = {
      videos: {
        byId: {
          videoId: mockVideo,
        },
        allIds: [mockVideo.id],
        selectedVideoId: mockVideo.id,
      },
      commentThreads: [],
    };

    const { getByRole, getByText, getByTitle } = renderWithRedux(
      <VideoDetail />,
      {
        initialState,
      }
    );

    const videoFrame = getByTitle(mockVideo.title);
    const videoTitle = getByRole("heading", { name: mockVideo.title });
    const videoDescription = getByText(mockVideo.description);

    expect(videoFrame).toBeInTheDocument();
    expect(videoTitle).toBeInTheDocument();
    expect(videoDescription).toBeInTheDocument();
  });

  it("renders loading state when no video has been selected", () => {
    const initialState: RootState = {
      videos: {
        byId: {},
        allIds: [],
        selectedVideoId: "",
      },
      commentThreads: [],
    };

    const { getByText } = renderWithRedux(<VideoDetail />, {
      initialState,
    });

    const loadingText = getByText("Loading...");

    expect(loadingText).toBeInTheDocument();
  });
});
