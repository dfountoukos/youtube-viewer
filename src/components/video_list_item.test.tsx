import { RootState } from "../redux/store";
import { fireEvent, renderWithRedux } from "../testUtils";
import * as videosActions from "../redux/actions/videos";
import VideoListItem from "./video_list_item";

describe("VideoListItem", () => {
  const mockVideo = {
    id: "videoId",
    title: "videoTitle",
    description: "videoDescription",
    thumbnailUrl: "thumbnailUrl",
  };

  const initialState: RootState = {
    videos: {
      byId: {
        [mockVideo.id]: mockVideo,
      },
      allIds: [mockVideo.id],
      selectedVideoId: mockVideo.id,
    },
    commentThreads: [],
  };

  it("renders a video list item", () => {
    const { getByRole, getByText } = renderWithRedux(
      <VideoListItem videoId={mockVideo.id} />,
      { initialState }
    );

    const videoThumbnail = getByRole("img", { name: mockVideo.description });
    const videoTitle = getByText(mockVideo.title);

    expect(videoThumbnail).toBeInTheDocument();
    expect(videoTitle).toBeInTheDocument();
  });

  it("dispatches setSelectedVideoIdAction on item click", () => {
    const actionSpy = jest.spyOn(videosActions, "setSelectedVideoIdAction");

    const { getByText } = renderWithRedux(
      <VideoListItem videoId={mockVideo.id} />,
      { initialState }
    );

    const videoTitle = getByText(mockVideo.title);

    fireEvent.click(videoTitle);

    expect(actionSpy).toHaveBeenCalledWith({ id: mockVideo.id });
  });
});
