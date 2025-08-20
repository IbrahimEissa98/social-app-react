import { addToast } from "@heroui/toast";
import {
  createComment,
  deleteCommentApi,
  deletePostApi,
  postsApi,
  singlePostApi,
  updateCommentApi,
  userPostsApi,
} from "../services/PostsApi";

export function createdAt(time) {
  const date = new Date(time);
  // console.log(date.toLocaleTimeString());
  // console.log(
  //   date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear()
  // );

  return (
    date.getDate() +
    "/" +
    (date.getMonth() + 1) +
    "/" +
    date.getFullYear() +
    ", " +
    date.toLocaleTimeString()
  );
}

export function handleVisibleComments(setVisibleComments, visibleComments) {
  setVisibleComments(visibleComments + 5);
}

export function copyToClipboard(inFeed, postId) {
  navigator.clipboard.writeText(
    inFeed ? location.href + "post-details/" + postId : location.href
  );
  addToast({
    title: `Link Copied to Clipboard successfully`,
    color: "success",
  });
}

export async function getPosts(setPosts, setIsLogin) {
  const data = await postsApi();
  console.log(data);

  if (data.message == "success") {
    setPosts(data.posts);
    console.log(data.posts);
  } else if (data.message == "Network Error") {
    addToast({
      title: `Network Error`,
    });
  } else {
    console.log(data.error);
    localStorage.removeItem("token");
    setIsLogin(false);
    addToast({
      title: `Invalid Token, Try to login again`,
    });
  }
}

export async function getSinglePost(id, setPost, navigate) {
  const response = await singlePostApi(id);
  if (response.message == "success" && response.post != null) {
    console.log(response);
    setPost(response.post);
    // setComments(response.post.comments);
  } else {
    addToast({
      title: `Post Not Found`,
      description: `This Post was deleted or does not exist`,
      color: "danger",
    });
    navigate("/");
  }
}

export async function handelDeletingPost(
  onClose,
  isNavigate,
  userId,
  post,
  setIsDeleting,
  setPosts,
  posts,
  navigate
) {
  if (userId != post.user._id) {
    return;
  }
  setIsDeleting(true);
  const response = await deletePostApi(post.id);
  if (response.message == "success") {
    if (isNavigate) {
      setPosts(
        posts.filter((currentPost) => {
          return currentPost.id == post.id ? null : currentPost;
        })
      );
    } else {
      navigate("/");
    }
    addToast({
      title: `Post Deleted Successfully`,
      color: "success",
    });
  } else {
    addToast({
      title: `Failed to delete post`,
      color: "danger",
    });
  }
  setIsDeleting(false);
  onClose();
}

// export async function handelUpdatingPost(
//   e,
//   userId,
//   post,
//   comment,
//   newContent,
//   setIsUpdating,
//   setPost,
//   setIsInUpdateMode
// ) {
//   setIsUpdating(true);
//   e.preventDefault();
//   if (userId != post.user._id && userId != comment.commentCreator._id) {
//     return;
//   }
//   if (newContent.trim().length < 2 || newContent.trim().length > 30) {
//     return;
//   }
//   const response = await updateCommentApi(comment._id, {
//     content: newContent,
//   });
//   if (response.message == "success") {
//     let comments = structuredClone(post.comments);
//     comments = comments.map((comment) => {
//       return comment._id == response.comment._id ? response.comment : comment;
//     });
//     setPost({ ...post, comments: comments.reverse() });
//     addToast({
//       title: `Comment Updated Successfully`,
//       color: "success",
//     });
//     setIsInUpdateMode(false);
//   } else {
//     addToast({
//       title: `Error`,
//       description: "Your comment not updated",
//       color: "danger",
//     });
//   }
//   setIsUpdating(false);
// }

export async function handelDeletingComment(
  onClose,
  userId,
  post,
  comment,
  setIsDeleting,
  setPost
) {
  if (userId != post.user._id && userId != comment.commentCreator._id) {
    return;
  }
  setIsDeleting(true);
  const currentCommentId = comment._id;
  const response = await deleteCommentApi(comment._id);
  if (response.message == "success") {
    let comments = structuredClone(post.comments);
    comments = comments.filter((comment) => {
      return comment._id == currentCommentId ? null : comment;
    });
    setPost({ ...post, comments: comments.reverse() });
    addToast({
      title: `Comment Deleted Successfully`,
      color: "success",
    });
  } else {
    addToast({
      title: `Error`,
      description: "Your comment not deleted",
      color: "danger",
    });
  }
  setIsDeleting(false);
  onClose();
}

export async function handleCommenting(
  e,
  setIsLoading,
  comment,
  id,
  setComment,
  setPost,
  post
) {
  setIsLoading(true);
  e.preventDefault();
  if (comment.trim().length < 2 || comment.trim().length > 30) {
    return;
  }
  const response = await createComment({ content: comment, post: id });
  console.log(response);

  if (response.message == "success") {
    setComment("");
    setPost({ ...post, comments: response.comments.reverse() });
    addToast({
      title: `Comment Created Successfully`,
      color: "success",
    });
  } else {
    addToast({
      title: `Failed to create comment`,
      color: "danger",
    });
  }
  setIsLoading(false);
}

export async function handelUpdatingComment(
  e,
  userId,
  post,
  comment,
  newContent,
  setIsUpdating,
  setPost,
  setIsInUpdateMode
) {
  setIsUpdating(true);
  e.preventDefault();
  if (userId != post.user._id && userId != comment.commentCreator._id) {
    return;
  }
  if (newContent.trim().length < 2 || newContent.trim().length > 30) {
    return;
  }
  const response = await updateCommentApi(comment._id, {
    content: newContent,
  });
  if (response.message == "success") {
    let comments = structuredClone(post.comments);
    comments = comments.map((comment) => {
      return comment._id == response.comment._id ? response.comment : comment;
    });
    setPost({ ...post, comments: comments.reverse() });
    addToast({
      title: `Comment Updated Successfully`,
      color: "success",
    });
    setIsInUpdateMode(false);
  } else {
    addToast({
      title: `Error`,
      description: "Your comment not updated",
      color: "danger",
    });
  }
  setIsUpdating(false);
}

export async function getUserPosts(userId, setPosts, setIsLoadingProfile) {
  console.log("Fetching user posts for userId:", userId);
  const data = await userPostsApi(userId);
  console.log(data);

  if (data.message == "success") {
    setPosts(data.posts.reverse());
    console.log(data.posts);
  } else if (data.message == "Network Error") {
    addToast({
      title: `Network Error`,
      description: "Please check your internet connection",
      color: "danger",
    });
  }

  setIsLoadingProfile(false);
}
