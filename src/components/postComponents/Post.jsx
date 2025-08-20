import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostHeader from "./PostHeader";
import Comment from "./Comment";
import PostBody from "./PostBody";
import PostReactions from "./PostReactions";
import PostActions from "./PostActions";
import { createdAt, handleVisibleComments } from "../../helper/helpers";
import CreateComment from "./CreateComment";
import { Button, DropdownTrigger } from "@heroui/react";
import DropdownActions from "./DropdownActions";
import { isLoginContext } from "../../contexts/IsLoginContext";
// import { deletePostApi } from "../../services/PostsApi";
import DeleteModal from "./DeleteModal";

export default function Post({
  post,
  setPost,
  posts,
  setPosts,
  commentsNum = 0,
  isNavigate,
  getSinglePost,
  // handelOpenModal,
  setChoosePost,
  number,
  // handelDeletingPost,
  isOpen,
  onOpen,
  onOpenChange,
  setIsPost,
  setCurrentComment,
  onOpenPostModal,
  style,
  onOpenCreatePost,
  setIsCreate,
  inProfilePage = false,
}) {
  // const [comments, setComments] = useState([]);
  const [visibleComments, setVisibleComments] = useState(5);
  const { user } = useContext(isLoginContext);
  // const navigate = useNavigate();
  // const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    // window.scrollTo(0, 0); // Scroll to top on mount
    setVisibleComments(commentsNum);
  }, []);

  useEffect(() => {
    // setComments(post.comments.reverse());
    // console.log(comments);
    // return () => {
    //   setComments(post.comments);
    //   // post.comments.reverse();
    // };
  }, [post.comments]);

  // function handleVisibleComments() {
  //   setVisibleComments(visibleComments + 5);
  // }

  // async function handelDeletingPost(onClose) {
  //   if (user._id != post.user._id) {
  //     return;
  //   }
  //   setIsDeleting(true);
  //   const response = await deletePostApi(post.id);
  //   if (response.message == "success") {
  //     if (isNavigate) {
  //       setPosts(
  //         posts.filter((currentPost) => {
  //           return currentPost.id == post.id ? null : currentPost;
  //         })
  //       );
  //     } else {
  //       navigate("/");
  //     }
  //     addToast({
  //       title: `Post Deleted Successfully`,
  //       color: "success",
  //     });
  //   }
  //   setIsDeleting(false);
  //   onClose();
  // }

  return (
    <>
      <div
        className={`w-full bg-white dark:bg-post-dark shadow-sm rounded-md ${style}`}
      >
        <div className="posts-profile flex justify-between p-4">
          <PostHeader
            photo={post.user.photo}
            name={post.user.name}
            time={createdAt(post.createdAt)}
          />
          <DropdownActions
            isUser={user._id == post.user._id}
            post={post}
            inFeed={isNavigate}
            posts={posts}
            setPosts={setPosts}
            // handelDeleting={handelDeletingPost}
            // isDeleting={isDeleting}
            isPost={true}
            setPost={setPost}
            isOpen={isOpen}
            onOpen={onOpen}
            onOpenChange={onOpenChange}
            setIsPost={setIsPost}
            isNavigate={isNavigate}
            onOpenCreatePost={onOpenCreatePost}
            setIsCreate={setIsCreate}
          />
        </div>

        <Link
          to={isNavigate && !inProfilePage && `post-details/${post.id}`}
          className=""
        >
          <PostBody body={post.body} image={post.image} />
        </Link>

        <PostReactions commentsNum={post.comments.length} />

        <PostActions
          id={post.id}
          isNavigate={isNavigate}
          handelOpenModal={onOpenPostModal}
          setChoosePost={setChoosePost}
          number={number}
          setPost={setPost}
          post={post}
        />

        <div
          className={`comments-box max-h-72 ${
            style ? "overflow-visible" : "overflow-auto"
          } `}
        >
          {isNavigate
            ? post.comments
                .reverse()
                .slice(0, visibleComments)
                .map((comment) => (
                  <Comment
                    key={comment._id}
                    comment={comment}
                    post={post}
                    setPost={setPost}
                    isUser={user._id == post.user._id}
                    // setIsDeleting={setIsDeleting}
                    // isDeleting={isDeleting}
                    getSinglePost={getSinglePost}
                    setIsPost={setIsPost}
                    isPost={false}
                    onOpen={onOpen}
                    setCurrentComment={setCurrentComment}
                  />
                ))
            : post.comments
                .reverse()
                .slice(0, visibleComments)
                .map((comment) => (
                  <Comment
                    key={comment._id}
                    comment={comment}
                    post={post}
                    setPost={setPost}
                    isUser={user._id == post.user._id}
                    // setIsDeleting={setIsDeleting}
                    // isDeleting={isDeleting}
                    getSinglePost={getSinglePost}
                    setIsPost={setIsPost}
                    isPost={false}
                    onOpen={onOpen}
                    setCurrentComment={setCurrentComment}
                  />
                ))}
          {/* {comments
            .reverse()
            .slice(0, visibleComments)
            .map((comment) => (
              <Comment
                key={comment._id}
                comment={comment}
                post={post}
                setPost={setPost}
                isUser={user._id == post.user._id}
                // setIsDeleting={setIsDeleting}
                // isDeleting={isDeleting}
                getSinglePost={getSinglePost}
                setIsPost={setIsPost}
                isPost={false}
                onOpen={onOpen}
                setCurrentComment={setCurrentComment}
              />
            ))} */}
          {commentsNum != 0 && post.comments.length > visibleComments && (
            <Button
              className="mt-2 mx-auto block text-primary underline"
              variant="light"
              onPress={() =>
                handleVisibleComments(setVisibleComments, visibleComments)
              }
            >
              Show more Comments...
            </Button>
          )}
        </div>
        {visibleComments != 0 && (
          <div
            className={`create-comment ${style && "absolute bottom-0 w-full"} `}
          >
            <CreateComment
              id={post.id}
              getSinglePost={getSinglePost}
              // setComments={setComments}
              post={post}
              setPost={setPost}
            />
          </div>
        )}
      </div>
    </>
  );
}
