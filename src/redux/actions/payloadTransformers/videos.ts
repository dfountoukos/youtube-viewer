import { YoutubeVideoSearchItem } from "youtube.ts";
import { VideosState } from "../../reducers/videos";

export const updateVideosPayloadTransformer = (videos: Array<YoutubeVideoSearchItem>) =>
  videos.reduce<VideosState>((acc, currentVideo) => {
    acc.byId[currentVideo.id.videoId] = {
      id: currentVideo.id.videoId,
      title: currentVideo.snippet.title,
      description: currentVideo.snippet.description,
      thumbnailUrl: currentVideo.snippet.thumbnails.default.url
    }

    acc.allIds.push(currentVideo.id.videoId)

    return acc
  }, { selectedVideoId: videos[0].id.videoId, byId: {}, allIds: [],  });