import React, { useContext, useEffect, useState } from "react";
import CreatePost from "../components/CreatePost";
import Post from "../components/postComponents/Post";
// import { postsApi } from "../services/PostsApi";
import { isLoginContext } from "../contexts/IsLoginContext";
// import { addToast } from "@heroui/toast";
import IsLoadingPost from "../components/IsLoadingPost";
import CreatePostBox from "../components/CreatePostBox";
import CreatePostBoxZod from "../components/CreatePostBoxZod";
// import { useDisclosure } from "@heroui/modal";
import PostModal from "../components/postComponents/PostModal";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../components/postComponents/DeleteModal";
import DropdownActions from "../components/postComponents/DropdownActions";
import { useDisclosure } from "@heroui/modal";
import {
  getPosts,
  handelDeletingComment,
  handelDeletingPost,
} from "../helper/helpers";

export default function FeedPage() {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState(null);
  const [isPost, setIsPost] = useState(false);
  const [isCreate, setIsCreate] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentComment, setCurrentComment] = useState(null);
  const { setIsLogin } = useContext(isLoginContext);
  const { user } = useContext(isLoginContext);
  const navigate = useNavigate();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const {
    isOpen: isOpenCreatePost,
    onOpen: onOpenCreatePost,
    // onOpenChange: onOpenChangeCreatePost,
    onClose: onCloseCreatePost,
  } = useDisclosure();
  const {
    isOpen: isOpenPostModal,
    onOpen: onOpenPostModal,
    // onOpenChange: onOpenChangePostModal,
    onClose: onClosePostModal,
  } = useDisclosure();

  // const [choosePost, setChoosePost] = useState(0);
  // const { isOpen, onOpen, onClose } = useDisclosure();

  // const timer = setInterval(getPosts, 10000);

  // async function getPosts() {
  //   const data = await postsApi();
  //   console.log(data);

  //   if (data.message == "success") {
  //     setPosts(data.posts);
  //     console.log(data.posts);
  //   } else if (data.message == "Network Error") {
  //     addToast({
  //       title: `Network Error`,
  //     });
  //   } else {
  //     console.log(data.error);
  //     localStorage.removeItem("token");
  //     setIsLogin(false);
  //     addToast({
  //       title: `Invalid Token, Try to login again`,
  //     });
  //   }
  // }

  useEffect(() => {
    window.scrollTo(0, 0);
    getPosts(setPosts, setIsLogin);
  }, []);

  // async function handelDeletingPost(onClose, isNavigate) {
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
      <div className="grid gap-2 pb-5 w-full!">
        {posts.length == 0 ? (
          <>
            <IsLoadingPost />
            <IsLoadingPost />
          </>
        ) : (
          <>
            <CreatePost handleOpen={onOpenCreatePost} />
            {/* <CreatePostBox getPosts={getPosts} /> */}
            {posts.map((post, index) => (
              <Post
                key={post.id}
                number={index}
                post={post}
                commentsNum={0}
                isNavigate={true}
                posts={posts}
                setPosts={setPosts}
                // handelDeletingPost={handelDeletingPost}
                setPost={setPost}
                isOpen={isOpen}
                onOpen={onOpen}
                onOpenChange={onOpenChange}
                setIsPost={setIsPost}
                onOpenPostModal={onOpenPostModal}
                onOpenCreatePost={onOpenCreatePost}
                setIsCreate={setIsCreate}
                // handelOpenModal={onOpen}
                // setChoosePost={setChoosePost}
              />
            ))}
          </>
        )}
        <DeleteModal
          title={isPost ? "post" : "Comment"}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          // handelDeleting={() =>
          //   handelDeletingPost(
          //     onClose,
          //     true,
          //     user._id,
          //     post,
          //     setIsDeleting,
          //     setPosts,
          //     posts,
          //     navigate
          //   )
          // }
          handelDeleting={
            isPost
              ? () =>
                  handelDeletingPost(
                    onClose,
                    true,
                    user._id,
                    post,
                    setIsDeleting,
                    setPosts,
                    posts,
                    navigate
                  )
              : () =>
                  handelDeletingComment(
                    onClose,
                    user._id,
                    post,
                    currentComment,
                    setIsDeleting,
                    setPost
                  )
          }
          isDeleting={isDeleting}
          isNavigate={true}
          onClosePostModal={onClosePostModal}
        />
        <CreatePostBox
          title={!isCreate ? "Edit Post" : "Create Post"}
          getPosts={() => getPosts(setPosts, setIsLogin)}
          isOpen={isOpenCreatePost}
          onClose={onCloseCreatePost}
          oldBody={post?.body}
          oldImage={post?.image}
          isCreate={isCreate}
          setIsCreate={setIsCreate}
          post={post}
        />

        {/* <DropdownActions
          isUser={user._id == post?.user._id}
          post={post}
          inFeed={isNavigate}
          posts={posts}
          setPosts={setPosts}
          handelDeleting={handelDeletingPost}
          isDeleting={isDeleting}
          isPost={true}
        /> */}
        {posts.length != 0 && (
          <PostModal
            post={post}
            isOpenModal={isOpenPostModal}
            onCloseModal={onClosePostModal}
            // onOpen={onOpen}
            setPost={setPost}
            setPosts={setPosts}
            isOpen={isOpen}
            onOpen={onOpen}
            onOpenChange={onOpenChange}
            setIsPost={setIsPost}
            setCurrentComment={setCurrentComment}
            isNavigate={true}
          />
        )}
      </div>
    </>
  );
}
