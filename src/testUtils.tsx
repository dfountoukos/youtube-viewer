import { render } from "@testing-library/react";
import { ReactElement } from "react";
import { Provider } from "react-redux";
import { configureStore, RootState } from "redux/store";

export * from "@testing-library/react";

export const renderWithRedux = (
  ui: ReactElement,
  options?: { initialState?: RootState }
) =>
  render(
    <Provider store={configureStore(options?.initialState)}>{ui}</Provider>
  );

export const createVideo = (discriminator: string = ""): Video => ({
  id: `videoId${discriminator}`,
  title: `videoTitle${discriminator}`,
  description: `videoDescription${discriminator}`,
  thumbnailUrl: `thumbnailUrl${discriminator}`,
});

export const createComment = (discriminator: string = ""): VideoComment => ({
  id: `commentId${discriminator}`,
  authorChannelUrl: `authorChannelUrl${discriminator}`,
  authorProfileImageUrl: `authorProfileImageUrl${discriminator}`,
  authorDisplayName: `authorDisplayName${discriminator}`,
  commentText: `commentText${discriminator}`,
});
