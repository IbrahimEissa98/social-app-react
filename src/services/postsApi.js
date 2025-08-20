import axios from "axios";

const baseUrl = "https://linked-posts.routemisr.com/";

export async function postsApi() {
  try {
    const { data } = await axios.get(baseUrl + "posts", {
      headers: {
        token: localStorage.getItem("token"),
      },
      params: {
        sort: "-createdAt",
        limit: 50,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    return error.response ? error.response.data : error.message;
  }
}

export async function singlePostApi(postId) {
  try {
    const { data } = await axios.get(baseUrl + "posts/" + postId, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    return error.response ? error.response.data : error.message;
  }
}

export async function createPost(formData) {
  try {
    const { data } = await axios.post(baseUrl + "posts/", formData, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    return error.response ? error.response.data : error.message;
  }
}

export async function createComment(CommentData) {
  try {
    const { data } = await axios.post(baseUrl + "comments", CommentData, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    return error.response ? error.response.data : error.message;
  }
}

export async function deletePostApi(postId) {
  try {
    const { data } = await axios.delete(baseUrl + "posts/" + postId, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    return error.response ? error.response.data : error.message;
  }
}

export async function updatePostApi(postId, formData) {
  try {
    const { data } = await axios.put(baseUrl + "posts/" + postId, formData, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    return error.response ? error.response.data : error.message;
  }
}

export async function deleteCommentApi(commentId) {
  try {
    const { data } = await axios.delete(baseUrl + "comments/" + commentId, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    return error.response ? error.response.data : error.message;
  }
}

export async function updateCommentApi(commentId, newContent) {
  try {
    const { data } = await axios.put(
      baseUrl + "comments/" + commentId,
      newContent,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    return data;
  } catch (error) {
    console.log(error);
    return error.response ? error.response.data : error.message;
  }
}

export async function userPostsApi(userId) {
  try {
    const { data } = await axios.get(baseUrl + "users/" + userId + "/posts", {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    return error.response ? error.response.data : error.message;
  }
}

// export async function UpdateProfilePhotoApi(formData) {
//   try {
//     const { data } = await axios.put(baseUrl + "users/upload-photo", formData, {
//       headers: {
//         token: localStorage.getItem("token"),
//       },
//     });
//     return data;
//   } catch (error) {
//     console.log(error);
//     return error.response ? error.response.data : error.message;
//   }
// }
