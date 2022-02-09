import React from "react";
import SearchBar from "./search_bar";
import { renderWithRedux, fireEvent, waitFor } from "../testUtils";
import { youtubeSearch } from "../services/youtube";

jest.mock("../services/youtube", () => ({
  youtubeSearch: jest.fn(),
}));

describe("SearchBar", () => {
  it("renders the search bar", () => {
    const { getByRole } = renderWithRedux(<SearchBar />);

    const inputField = getByRole("textbox");

    expect(inputField).toBeInTheDocument();
  });

  it("on mount, fetches videos for the default search term", async () => {
    const mockResult = {
      id: {
        videoId: "videoId",
      },
      snippet: {
        title: "videoTitle",
        description: "videoDescription",
        thumbnails: {
          default: {
            url: "videoUrl",
          },
        },
      },
    };

    (youtubeSearch as jest.Mocked<any>).mockImplementation(() => [mockResult]);

    renderWithRedux(<SearchBar />);

    expect(youtubeSearch).not.toHaveBeenCalled();

    await waitFor(() =>
      expect(youtubeSearch).toHaveBeenCalledWith("liverpool")
    );
  });

  it("fetches videos after typing in the input field", async () => {
    const mockResult = {
      id: {
        videoId: "videoId",
      },
      snippet: {
        title: "videoTitle",
        description: "videoDescription",
        thumbnails: {
          default: {
            url: "videoUrl",
          },
        },
      },
    };

    (youtubeSearch as jest.Mocked<any>).mockImplementation(() => [mockResult]);

    const { getByRole } = renderWithRedux(<SearchBar />);

    expect(youtubeSearch).not.toHaveBeenCalled();

    const input = getByRole("textbox");

    fireEvent.change(input, { target: { value: "nasa" } });

    await waitFor(() => expect(youtubeSearch).toHaveBeenCalledWith("nasa"));
  });
});
