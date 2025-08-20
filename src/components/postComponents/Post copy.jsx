import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostHeader from "./PostHeader";
import Comment from "./Comment";
import PostBody from "./PostBody";
import PostReactions from "./PostReactions";
import PostActions from "./PostActions";
import { createdAt } from "../../helper/helpers";
import CreateComment from "./CreateComment";
import { Button } from "@heroui/react";

export default function Post({
  post,
  setPost,
  commentsNum = 0,
  isNavigate,
  getSinglePost,
}) {
  const [comments, setComments] = useState([]);
  const [visibleComments, setVisibleComments] = useState(5);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on mount
    setVisibleComments(commentsNum);
    setComments(post.comments.reverse());
  }, []);

  // useEffect(() => {
  //   setComments(post.comments.reverse());
  //   // console.log("rerender");
  // }, [setComments, post.comments]);

  function handleVisibleComments() {
    setVisibleComments(visibleComments + 5);
  }

  return (
    <>
      <div className="w-full bg-white dark:bg-post-dark shadow-sm rounded-md">
        <div className="posts-profile flex justify-between p-4">
          <PostHeader
            photo={post.user.photo}
            name={post.user.name}
            time={createdAt(post.createdAt)}
          />
          <div className="cancel flex gap-4 items-center">
            <i className="fa-solid fa-ellipsis" />
            <i className="fa-solid fa-x" />
          </div>
        </div>

        <Link to={isNavigate && `post-details/${post.id}`} className="">
          <PostBody body={post.body} image={post.image} />
        </Link>

        <PostReactions commentsNum={post.comments.length} />

        <PostActions id={post.id} isNavigate={isNavigate} />

        <div className="comments-box max-h-72 overflow-auto">
          {comments.slice(0, visibleComments).map((comment) => (
            <Comment
              key={comment._id}
              photo={comment.commentCreator.photo}
              name={comment.commentCreator.name}
              content={comment.content}
              time={createdAt(comment.createdAt)}
            />
          ))}
          {/* {post.comments
            .reverse()
            .slice(0, visibleComments)
            .map((comment) => (
              <Comment
                photo={comment.commentCreator.photo}
                name={comment.commentCreator.name}
                content={comment.content}
                time={createdAt(comment.createdAt)}
              />
            ))} */}
          {commentsNum != 0 && post.comments.length > visibleComments && (
            <Button
              className="mt-2 mx-auto block text-primary underline"
              variant="light"
              onPress={handleVisibleComments}
            >
              Show more Comments...
            </Button>
          )}
        </div>
        {visibleComments != 0 && (
          <div className="create-comment">
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
