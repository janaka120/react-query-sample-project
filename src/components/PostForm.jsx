import { useState } from "react";

const PostForm = (props) => {
    const [post, setPost] = useState({
        title: props?.data.title || "",
        body: props?.data.body || ""
    });

    const onChangeHandler = (e) => {
        setPost({
            ...post,
            [e.target.name]: e.target.value
        });
    }

    const renderField = (label) => {
        return (
            <div>
                <label>{label}</label>
                <input type="text" name={label.toLowerCase()} onChange={onChangeHandler} value={post[label.toLowerCase()]}/>
            </div>
        );
    }
    const onSubmitHandler = (e) => {
        e.preventDefault();
        props.onSubmit(post);
        setPost({
            title: '',
            body: ''
        });
    }
    return (
        <form onSubmit={onSubmitHandler}>
            {renderField("Title")}
            {renderField("Body")}
            <button>Submit</button>
        </form>
    )
}

export default PostForm;