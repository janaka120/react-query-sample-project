export async function fetchPosts() {
    const res = await fetch("http://localhost:3000/posts")
    const result = await res.json();
    return result;
}

export async function fetchPost(id) {
    const res = await fetch(`http://localhost:3000/posts/${id}`)
    const result = await res.json();
    return result;
}

export async function createPost(payload) {
    console.log("create >>", payload);
    const res = await fetch(`http://localhost:3000/posts`, {
        method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    const result = await res.json();
    return result;
}

export async function updatePost(payload) {
    const res = await fetch(`http://localhost:3000/posts/${payload.id}`, {
        method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    const result = await res.json();
    return result;
}

export async function deletePost(id) {
    const res = await fetch(`http://localhost:3000/posts/${id}`, {
        method: 'DELETE',
    })
    const result = await res.json();
    return result;
}