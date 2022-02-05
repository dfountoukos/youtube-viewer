import React, { useEffect, useState } from "react";
import { youtubeComments } from "services/youtube";
import VideoCommentListItem from "./video_comment_list_item";

interface VideoCommentListProps {
  videoId?: string;
}

const VideoCommentList: React.FC<VideoCommentListProps> = ({ videoId }) => {
  const [commentThreads, setCommentThreads] = useState<Awaited<
    ReturnType<typeof youtubeComments>
  > | null>(null);

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

  return (
    <>
      <h4>Comments</h4>
      {(!videoId || !commentThreads) && <p>Loading comments...</p>}

      {!commentThreads?.length && <p>No comments exist for this video yet</p>}

      {!!commentThreads?.length && (
        <ul className="media-list">
          {commentThreads.map((thread) => (
            <li className="media" key={thread.id}>
              <VideoCommentListItem thread={thread} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default VideoCommentList;
