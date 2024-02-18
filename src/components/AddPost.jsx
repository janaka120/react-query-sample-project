import { useMutation, useQueryClient } from "@tanstack/react-query";
import PostForm from "./PostForm"
import { createPost } from "../api/posts";

const AddPost = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (newPost) => {
          return createPost(newPost);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] })
          },
      });

    if(mutation.isPending) {
        return <div>Creating post...</div>
    }
    
    return (
        <div>
            <h3>Create Post</h3>
            <PostForm onSubmit={(payload) => mutation.mutate(payload)} data={{title: '', body: ''}} />
        </div>
    )
};

export default AddPost;