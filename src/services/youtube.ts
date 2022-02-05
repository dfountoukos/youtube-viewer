import Youtube, {
  YoutubeSearchParams,
  YoutubeVideoSearchItem,
  YoutubeCommentThread,
} from "youtube.ts";

// const API_KEY = "AIzaSyBwGseFWjTJ9wwGVpB-gB9_E3DoYFzmE-4";
const API_KEY = "AIzaSyCbcQMTPqAevOao2BQsQadm5SFTZljP2dM"; // provided by exercise;

const youtube = new Youtube(API_KEY);

export const youtubeSearch = async (term: string) => {
  const defaultParams: YoutubeSearchParams = {
    part: "snippet",
    maxResults: 5,
  };

  let videos: Array<YoutubeVideoSearchItem> = [];
  try {
    const result = await youtube.videos.search({ ...defaultParams, q: term });

    videos = result.items;
  } catch (error) {
    console.error(error);
  }

  return videos;
};

export const youtubeComments = async (videoId: string) => {
  let commentThreads: Array<YoutubeCommentThread> = [];
  try {
    const result = await youtube.videos.comments(videoId);

    commentThreads = result.items;
  } catch (error) {
    console.error(error);
  }

  return commentThreads;
};

export default youtube;
