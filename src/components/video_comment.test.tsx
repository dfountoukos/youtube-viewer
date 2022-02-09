import React from "react";
import { render } from "@testing-library/react";
import VideoComment from "./video_comment";

describe("VideoComment", () => {
  const createComment = (discriminator: string = "") => ({
    id: `commentId${discriminator}`,
    authorChannelUrl: `authorChannelUrl${discriminator}`,
    authorProfileImageUrl: `authorProfileImageUrl${discriminator}`,
    authorDisplayName: `authorDisplayName${discriminator}`,
    commentText: `commentText${discriminator}`,
  });

  it("renders a single video comment", () => {
    const videoComment = createComment();

    const { getByRole, getByText } = render(<VideoComment {...videoComment} />);
    const avatar = getByRole("img", { name: videoComment.authorDisplayName });
    const authorName = getByRole("heading", {
      name: videoComment.authorDisplayName,
    });
    const commentText = getByText(videoComment.commentText);

    expect(avatar).toBeInTheDocument();
    expect(authorName).toBeInTheDocument();
    expect(commentText).toBeInTheDocument();
  });

  it("renders a nested video comments", () => {
    const videoComment1 = createComment("1");
    const videoComment2 = createComment("2");

    const NestedComments = () => (
      <VideoComment {...videoComment1}>
        <VideoComment {...videoComment2}></VideoComment>
      </VideoComment>
    );
    const { getByRole, getByText } = render(<NestedComments />);

    const avatar1 = getByRole("img", { name: videoComment1.authorDisplayName });
    const authorName1 = getByRole("heading", {
      name: videoComment1.authorDisplayName,
    });
    const commentText1 = getByText(videoComment1.commentText);

    const avatar2 = getByRole("img", { name: videoComment2.authorDisplayName });
    const authorName2 = getByRole("heading", {
      name: videoComment2.authorDisplayName,
    });
    const commentText2 = getByText(videoComment2.commentText);

    expect(avatar1).toBeInTheDocument();
    expect(authorName1).toBeInTheDocument();
    expect(commentText1).toBeInTheDocument();

    expect(avatar2).toBeInTheDocument();
    expect(authorName2).toBeInTheDocument();
    expect(commentText2).toBeInTheDocument();
  });
});
