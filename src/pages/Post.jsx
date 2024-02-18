import { useQuery } from "@tanstack/react-query";
import { fetchPost } from "../api/posts";
import { useNavigate, useParams } from "react-router-dom";

const Post = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    isLoading,
    error,
    data: post,
  } = useQuery({
    queryKey: ["posts", id],
    queryFn: () => fetchPost(id),
  });
  if (isLoading) {
    return <div>Post Loading...</div>;
  }
  if (error) {
    return <div>Post Fetch Error...</div>;
  }

  return (
    <div>
      <h2>
        {post.id}: {post.title}
      </h2>
      <div>{post.body}</div>
      <button onClick={() => navigate("/")}>Back</button>
    </div>
  );
};

export default Post;
