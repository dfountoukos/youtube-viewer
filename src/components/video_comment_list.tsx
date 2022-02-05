import React, { useEffect, useState } from "react";
import { youtubeComments } from "services/youtube";
import VideoCommentListItem from "./video_comment_list_item";

interface VideoCommentListProps {
  videoId?: string;
}

const VideoCommentList: React.FC<VideoCommentListProps> = ({ videoId }) => {
  const [commentThreads, setCommentThreads] = useState<
    Awaited<ReturnType<typeof youtubeComments>>
  >([]);

  useEffect(() => {
    if (videoId) {
      const fetchCommentThreads = async (videoId: string) => {
        const results = await youtubeComments(videoId);

        console.log(results);

        return setCommentThreads(results);
      };

      fetchCommentThreads(videoId);
    }
  }, [videoId]);

  if (!videoId || !commentThreads.length) {
    return <div>Loading comments...</div>;
  }

  return (
    <>
      <h4>Comments</h4>
      <ul className="media-list">
        {commentThreads.map((thread) => (
          <li className="media" key={thread.id}>
            <VideoCommentListItem thread={thread} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default VideoCommentList;
