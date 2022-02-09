import { RootState } from "../redux/store";
import { renderWithRedux } from "../testUtils";
import { youtubeComments } from "../services/youtube";
import VideoCommentList from "./video_comment_list";

jest.mock("../services/youtube", () => ({
  youtubeComments: jest.fn(),
}));

describe("VideoCommentList", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("fetches and renders the comment list for the selected video", async () => {
    const mockCommentThread = {
      id: "threadId",
      snippet: {
        topLevelComment: {
          id: "tlCommentId",
          snippet: {
            authorChannelUrl: "tlAuthorUrl",
            authorProfileImageUrl: "tlProfileImageUrl",
            authorDisplayName: "authorName",
            textOriginal: "comment text",
          },
        },
      },
      replies: {
        comments: [],
      },
    };

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

    (youtubeComments as jest.Mocked<any>).mockImplementationOnce(() => [
      mockCommentThread,
    ]);

    const { getByRole, getByText, findByRole } = renderWithRedux(
      <VideoCommentList />,
      {
        initialState,
      }
    );

    const commentsTitle = getByRole("heading", { name: "Comments" });

    const avatar = await findByRole("img", {
      name: mockCommentThread.snippet.topLevelComment.snippet.authorDisplayName,
    });
    const authorName = getByRole("heading", {
      name: mockCommentThread.snippet.topLevelComment.snippet.authorDisplayName,
    });
    const commentText = getByText(
      mockCommentThread.snippet.topLevelComment.snippet.textOriginal
    );

    expect(commentsTitle).toBeInTheDocument();
    expect(avatar).toBeInTheDocument();
    expect(authorName).toBeInTheDocument();
    expect(commentText).toBeInTheDocument();
  });

  it("renders loading state when no video has already been selected", () => {
    const initialState: RootState = {
      videos: {
        byId: {},
        allIds: [],
        selectedVideoId: "",
      },
      commentThreads: [],
    };

    (youtubeComments as jest.Mocked<any>).mockImplementationOnce(() => []);

    const { getByText } = renderWithRedux(<VideoCommentList />, {
      initialState,
    });

    const loadingText = getByText("Loading comments...");

    expect(loadingText).toBeInTheDocument();
  });

  it("renders no comments exist state when no comment threads exist for the selected video", () => {
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
        selectedVideoId: "otherVideoId",
      },
      commentThreads: [],
    };

    (youtubeComments as jest.Mocked<any>).mockImplementationOnce(() => []);

    const { getByText } = renderWithRedux(<VideoCommentList />, {
      initialState,
    });

    const noCommentsText = getByText("No comments exist for this video yet");

    expect(noCommentsText).toBeInTheDocument();
  });
});
