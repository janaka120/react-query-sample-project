import { Route, Routes } from "react-router-dom";
import PostList from "./pages/PostList";
import Post from "./pages/Post";
import PostEdit from "./pages/PostEdit";

function App() {

  return (
    <div>
      <h1>React Query Post List</h1>
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/post/:id/edit" element={<PostEdit />} />
      </Routes>
    </div>
  )
}

export default App
