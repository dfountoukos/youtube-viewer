import { YoutubeVideoSearchItem } from "youtube.ts";
import { VideosState } from "../../reducers/videos";
import { updateVideosPayloadTransformer } from "./videos";

describe("videos payload transformers", () => {
  describe("updateVideosPayloadTransformer", () => {
    const mockVideoSearchItem: YoutubeVideoSearchItem = {
      kind: "videoKind",
      etag: "videoEtag",
      id: {
        kind: "videoKind",
        videoId: "videoId",
      },
      snippet: {
        publishedAt: "someDate",
        channelId: "channelId",
        title: "videoTitle",
        description: "videoDescription",
        thumbnails: {
          default: { url: "url", width: 100, height: 100 },
          medium: { url: "url", width: 100, height: 100 },
          high: { url: "url", width: 100, height: 100 },
        },
        channelTitle: "channelTitle",
        liveBroadcastContent: "content",
      },
    };

    it("generates payload when there are search results", () => {
      const actual = updateVideosPayloadTransformer([mockVideoSearchItem]);
      const expected: VideosState = {
        byId: {
          [mockVideoSearchItem.id.videoId]: {
            id: mockVideoSearchItem.id.videoId,
            title: mockVideoSearchItem.snippet.title,
            description: mockVideoSearchItem.snippet.description,
            thumbnailUrl: mockVideoSearchItem.snippet.thumbnails.default.url,
          },
        },
        allIds: [mockVideoSearchItem.id.videoId],
        selectedVideoId: mockVideoSearchItem.id.videoId,
      };

      expect(actual).toEqual(expected);
    });

    it("generates payload correctly when there are no search results", () => {
      const actual = updateVideosPayloadTransformer([]);
      const expected: VideosState = {
        selectedVideoId: "",
        byId: {},
        allIds: [],
      };

      expect(actual).toEqual(expected);
    });
  });
});
