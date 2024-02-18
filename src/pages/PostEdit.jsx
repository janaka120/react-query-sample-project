import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPost, updatePost } from "../api/posts";
import PostForm from "../components/PostForm";

const PostEdit = () => {
  const { id } = useParams();
  console.log("id >>", id);
  const navigate = useNavigate();
  const {
    isLoading,
    error,
    data: post,
  } = useQuery({
    queryKey: ["posts", id],
    queryFn: () => fetchPost(id),
  });
  

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (newPost) => {
      return updatePost(newPost);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      navigate('/')
    },
  });

if (isLoading) {
    return <div>Post Loading...</div>;
  }
  if (error) {
    return <div>Post Fetch Error...</div>;
  }
  
  if (mutation.error) {
    return <div>Updating post error...</div>;
  }

  return (
    <div>
      <h3>Update Post</h3>
      <PostForm data={post} onSubmit={(payload) => mutation.mutate({...payload, id: post.id})} />
      <button onClick={() => navigate("/")}>Back</button>
    </div>
  );
};

export default PostEdit;
