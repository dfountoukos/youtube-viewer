import { youtubeComments, youtubeSearch } from "./youtube";

jest.mock("youtube.ts", () => {
  return function () {
    return {
      videos: {
        search: () => Promise.resolve({ items: [] }),
        comments: () => Promise.resolve({ items: [] }),
      },
    };
  };
});

describe("youtube service", () => {
  describe("youtubeSearch", () => {
    it("returns results", async () => {
      const result = await youtubeSearch("searchTerm");

      expect(result).toEqual([]);
    });
  });

  describe("youtubeComments", () => {
    it("returns results", async () => {
      const result = await youtubeComments("videoId");

      expect(result).toEqual([]);
    });
  });
});
