import React, { useContext, useEffect, useState } from "react";
import profilePlaceholder from "../../assets/images/profile-placeholder.jpg";
import DropdownActions from "./DropdownActions";
import { isLoginContext } from "../../contexts/IsLoginContext";
// import { updateCommentApi } from "../../services/PostsApi";
// import { addToast } from "@heroui/toast";
import { createdAt, handelUpdatingComment } from "../../helper/helpers";
import { Button, Input, Spinner } from "@heroui/react";

export default function Comment({
  comment,
  post,
  setPost,
  isUser,
  // setIsDeleting,
  isDeleting,
  // getSinglePost,
  setIsPost,
  // isPost,
  onOpen,
  setCurrentComment,
}) {
  const [likes, setLikes] = useState(0);
  const { user } = useContext(isLoginContext);
  const [isInUpdateMode, setIsInUpdateMode] = useState(false);
  const [newContent, setNewContent] = useState(comment.content);
  const [isUpdating, setIsUpdating] = useState(false);

  function handleLike() {
    setLikes(Math.floor(Math.random() * 20));
  }
  useEffect(() => {
    handleLike();
  }, []);

  // async function handelDeletingComment(onClose) {
  //   if (user._id != post.user._id && user._id != comment.commentCreator._id) {
  //     return;
  //   }
  //   setIsDeleting(true);
  //   const currentCommentId = comment._id;
  //   const response = await deleteCommentApi(comment._id);
  //   if (response.message == "success") {
  //     let comments = structuredClone(post.comments);
  //     comments = comments.filter((comment) => {
  //       return comment._id == currentCommentId ? null : comment;
  //     });
  //     setPost({ ...post, comments: comments.reverse() });
  //     addToast({
  //       title: `Comment Deleted Successfully`,
  //       color: "success",
  //     });
  //   } else {
  //     addToast({
  //       title: `Error`,
  //       description: "Your comment not deleted",
  //       color: "danger",
  //     });
  //   }
  //   setIsDeleting(false);
  //   onClose();
  // }

  // async function handelDeletingComment(onClose) {
  //   if (user._id != post.user._id && user._id != comment.commentCreator._id) {
  //     return;
  //   }
  //   setIsDeleting(true);
  //   const response = await deleteCommentApi(comment._id);
  //   if (response.message == "success") {
  //     await getSinglePost(post._id);
  //     addToast({
  //       title: `Comment Deleted Successfully`,
  //       color: "success",
  //     });
  //   } else {
  //     addToast({
  //       title: `Error`,
  //       description: "Your comment not deleted",
  //       color: "danger",
  //     });
  //   }
  //   setIsDeleting(false);
  //   onClose();
  // }

  // async function handelUpdatingComment(e) {
  //   setIsUpdating(true);
  //   e.preventDefault();
  //   if (user._id != post.user._id && user._id != comment.commentCreator._id) {
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

  // async function handelUpdatingComment(e) {
  //   setIsUpdating(true);
  //   e.preventDefault();
  //   if (user._id != post.user._id && user._id != comment.commentCreator._id) {
  //     return;
  //   }
  //   if (newContent.trim().length < 2 || newContent.trim().length > 30) {
  //     return;
  //   }
  //   const response = await updateCommentApi(comment._id, {
  //     content: newContent,
  //   });
  //   if (response.message == "success") {
  //     await getSinglePost(post._id);
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

  return (
    <div className="flex gap-3 px-4 py-1.5 group">
      <div className="image">
        <img
          onError={(e) => {
            e.target.src = profilePlaceholder;
          }}
          src={comment.commentCreator.photo}
          className="rounded-full w-11 h-10"
          alt=""
        />
      </div>
      <div className="content min-w-52">
        <div className="p-2 rounded-2xl bg-gray-100 dark:bg-base-dark">
          <p className="mb-0 font-bold">{comment.commentCreator.name}</p>
          {isInUpdateMode ? (
            <div className="min-w-80 relative">
              <form
                onSubmit={(e) =>
                  handelUpdatingComment(
                    e,
                    user._id,
                    post,
                    comment,
                    newContent,
                    setIsUpdating,
                    setPost,
                    setIsInUpdateMode
                  )
                }
              >
                <Input
                  type="text"
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Write updated comment..."
                  className=""
                  style={{ paddingRight: "50px" }}
                  autoFocus={true}
                  id="comment"
                  variant="bordered"
                  isDisabled={isUpdating}
                />
                <Button
                  type="submit"
                  variant="light"
                  className="absolute right-0 top-0 min-w-fit"
                  isDisabled={
                    newContent.trim().length < 2 ||
                    newContent.trim().length > 30 ||
                    isUpdating
                      ? true
                      : false
                  }
                >
                  {isUpdating ? (
                    <Spinner />
                  ) : (
                    <i
                      className="fa-solid fa-paper-plane fa-rotate-by"
                      style={{ transform: "rotate(45deg)" }}
                    />
                  )}
                </Button>
              </form>
              {!isUpdating && (
                <p
                  onClick={() => {
                    setIsInUpdateMode(false);
                    setNewContent(comment.content);
                  }}
                  className="text-primary text-sm ms-3 cursor-pointer hover:underline"
                >
                  Cancel
                </p>
              )}
            </div>
          ) : (
            <p className="text-medium">{comment.content}</p>
          )}
        </div>
        {!isInUpdateMode && (
          <div className="flex justify-between">
            <p className="text-gray-400 text-sm">
              {createdAt(comment.createdAt)}
            </p>
            <div className="flex">
              {likes != 0 && (
                <>
                  <span className="text-sm">{likes}</span>
                  <span className="bg-blue-700 w-5 h-5 flex justify-center items-center rounded-full ml-1">
                    <i className="fa-solid fa-thumbs-up text-white text-sm" />
                  </span>
                </>
              )}
            </div>
          </div>
        )}
      </div>
      {post.user._id == comment.commentCreator._id &&
        isUser &&
        !isInUpdateMode && (
          <div className="self-center">
            <DropdownActions
              isUser={isUser}
              post={post}
              setPost={setPost}
              onOpen={onOpen}
              // inFeed={isNavigate}
              // posts={posts}
              // setPosts={setPosts}
              // handelDeleting={handelDeletingComment}
              isDeleting={isDeleting}
              isPost={false}
              style={"text-gray-500 dark:text-gray-400 text-lg!"}
              setIsInUpdateMode={setIsInUpdateMode}
              setIsPost={setIsPost}
              setCurrentComment={setCurrentComment}
              comment={comment}
            />
          </div>
        )}
    </div>
  );
}
