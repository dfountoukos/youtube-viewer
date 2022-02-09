import App from "./App";
import { RootState } from "./redux/store";
import { renderWithRedux, within } from "./testUtils";

describe("App", () => {
  const createComment = (discriminator: string = "") => ({
    id: `commentId${discriminator}`,
    authorChannelUrl: `authorChannelUrl${discriminator}`,
    authorProfileImageUrl: `authorProfileImageUrl${discriminator}`,
    authorDisplayName: `authorDisplayName${discriminator}`,
    commentText: `commentText${discriminator}`,
  });

  const createVideo = (discriminator: string = "") => ({
    id: `videoId${discriminator}`,
    title: `videoTitle${discriminator}`,
    description: `videoDescription${discriminator}`,
    thumbnailUrl: `thumbnailUrl${discriminator}`,
  });

  it("renders app elements", () => {
    const mockVideo1 = createVideo("1");
    const mockVideo2 = createVideo("2");
    const mockComment1a = createComment("1a");
    const mockComment1b = createComment("1b");

    const mockCommentThread1 = {
      id: "threadId1",
      topLevelComment: mockComment1a,
      replies: [mockComment1b],
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
      commentThreads: [mockCommentThread1],
    };

    const { getByRole, getByTitle, getByText, getByTestId } = renderWithRedux(
      <App />,
      {
        initialState,
      }
    );

    const searchField = getByRole("textbox");
    const selectedVideoFrame = getByTitle(mockVideo1.title);
    const selectedVideoTitle = getByRole("heading", { name: mockVideo1.title });
    const commenterAvatar = getByRole("img", {
      name: mockComment1a.authorDisplayName,
    });
    const commentText = getByText(mockComment1a.commentText);

    const videoListItemThumbnail = getByRole("img", {
      name: mockVideo1.description,
    });
    const videoTitle = within(getByTestId(mockVideo1.id)).getByText(
      mockVideo1.title
    );

    expect(searchField).toBeInTheDocument();
    expect(selectedVideoFrame).toBeInTheDocument();
    expect(selectedVideoTitle).toBeInTheDocument();
    expect(commenterAvatar).toBeInTheDocument();
    expect(commentText).toBeInTheDocument();
    expect(videoListItemThumbnail).toBeInTheDocument();
    expect(videoTitle).toBeInTheDocument();
  });
});
