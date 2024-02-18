import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deletePost, fetchPosts } from "../api/posts";
import AddPost from "../components/AddPost";
import { useNavigate } from "react-router-dom";

const PostList = () => {
  const { isLoading, error, data: posts } = useQuery({
    queryKey: ["posts"],
    queryFn: () => fetchPosts(),
  });

  const navigate = useNavigate();


  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id) => {
      return deletePost(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  if(isLoading) {
    return <div>Loading..</div>
  }

  if(error) {
    return <div>Post Fetch Erorr..</div>
  }
  
  if (mutation.error) {
    return <div>Deleting post error...</div>;
  }
  return (
    <div>
      <AddPost />
      <h3>Post List</h3>
      {posts.map((post) => {
        return (
            <div key={post.id} id={post.id} style={{display: 'flex', flexDirection: 'column', background: '#f3f3f3'}}>
                <h4 style={{cursor: 'pointer'}} onClick={() => navigate(`/post/${post.id}`)}>{post.id}: {post.title}</h4>
                <span>{post.body}</span>
                <div>
                    <button onClick={() => navigate(`/post/${post.id}/edit`)}>Edit</button>
                    <button onClick={() => mutation.mutate(post.id)}>Delete</button>
                </div>
            </div>
        )
      })}
    </div>
  );
};

export default PostList;
