import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { singlePostApi } from "../services/PostsApi";
import Post from "../components/postComponents/Post";
import Comment from "../components/postComponents/Comment";
import IsLoadingPost from "../components/IsLoadingPost";
// import { addToast } from "@heroui/toast";
import { useDisclosure } from "@heroui/modal";
import {
  getSinglePost,
  handelDeletingComment,
  handelDeletingPost,
} from "../helper/helpers";
import { isLoginContext } from "../contexts/IsLoginContext";
import DeleteModal from "../components/postComponents/DeleteModal";

export default function PostDetailsPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [isPost, setIsPost] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentComment, setCurrentComment] = useState(null);
  const navigate = useNavigate();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { user } = useContext(isLoginContext);
  // const [comments, setComments] = useState([]);
  // const [visibleComments, setVisibleComments] = useState(5);

  // async function getSinglePost(id) {
  //   const response = await singlePostApi(id);
  //   if (response.message == "success" && response.post != null) {
  //     console.log(response);
  //     setPost(response.post);
  //     // setComments(response.post.comments);
  //   } else {
  //     addToast({
  //       title: `Post Not Found`,
  //       description: `This Post was deleted or does not exist`,
  //       color: "danger",
  //     });
  //     navigate("/");
  //   }
  // }

  // function handleVisibleComments() {
  //   setVisibleComments(visibleComments + 5);
  // }

  useEffect(() => {
    window.scrollTo(0, 0);
    getSinglePost(id, setPost, navigate);
  }, []);

  return (
    <>
      {post == null ? (
        <IsLoadingPost />
      ) : (
        // <Post
        //   post={post}
        //   setPost={setPost}
        //   commentsNum={5}
        //   isNavigate={false}
        //   getSinglePost={getSinglePost}
        // />
        <Post
          key={post.id}
          post={post}
          commentsNum={5}
          isNavigate={false}
          // posts={posts}
          // setPosts={setPosts}
          // handelDeletingPost={handelDeletingPost}
          setPost={setPost}
          isOpen={isOpen}
          onOpen={onOpen}
          onOpenChange={onOpenChange}
          setIsPost={setIsPost}
          setCurrentComment={setCurrentComment}
          // handelOpenModal={onOpen}
          // setChoosePost={setChoosePost}
        />
      )}
      <DeleteModal
        title={isPost ? "post" : "Comment"}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        handelDeleting={
          isPost
            ? () =>
                handelDeletingPost(
                  onClose,
                  false,
                  user._id,
                  post,
                  setIsDeleting,
                  null,
                  null,
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
        isNavigate={false}
      />
      {/* {console.log(post)} */}
      {/* {comments.map((comment) => (
        <Comment
          content={comment.content}
          name={comment.commentCreator.name}
          photo={comment.commentCreator.photo}
          time={createdAt(comment.createdAt)}
          key={comment.id}
        />
      ))} */}
    </>
  );
}
