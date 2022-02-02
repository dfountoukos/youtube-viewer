declare module 'youtube-api-search' {
  type Options = { key: string; term: string; }
  type CallbackFn = (videos: Array<YoutubeVideo>) => void
  
  function YTSearch(options: Options, callback: CallbackFn): Array<YoutubeVideo>;
  export = YTSearch;
};

// Copied youtube related types for temporary usage from
// https://github.com/Tenpi/youtube.ts/blob/master/types/VideoTypes.ts

interface YoutubeVideo {
  kind: string
  etag: string
  id: YoutubeVideoId
  snippet: YoutubeVideoSnippet
  contentDetails: YoutubeVideoContentDetails
  status: YoutubeVideoStatus
  statistics: YoutubeVideoStatistics
  player: {
    embedHtml: string
  }
}

interface YoutubeVideoId {
  kind: string;
  videoId: string;
}

interface YoutubeVideoStatistics {
  viewCount: string
  likeCount: string
  dislikeCount: string
  favoriteCount: string
  commentCount: string
}

interface YoutubeVideoStatus {
  uploadStatus: string
  privacyStatus: string
  license: string
  embeddable: boolean
  publicStatsViewable: boolean
}

interface YoutubeVideoContentDetails {
  duration: string
  dimension: string
  definition: string
  caption: string
  licensedContent: boolean
  projection: string
}

interface YoutubeVideoSnippet {
  publishedAt: string
  channelId: string
  title: string
  description: string
  thumbnails: {
      default: YoutubeThumbnail
      medium: YoutubeThumbnail
      high: YoutubeThumbnail
      standard?: YoutubeThumbnail
      maxres?: YoutubeThumbnail
  },
  channelTitle: string
  tags: string[]
  categoryId: string
  liveBroadcastContent: string
  defaultLanguage: string
  localized: {
      title: string
      description: string
      defaultAudioLanguage: string
  }
}

interface YoutubeThumbnail {
  url: string
  width: number
  height: number
}