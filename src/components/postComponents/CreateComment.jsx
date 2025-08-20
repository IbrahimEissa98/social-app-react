import React, { useState } from "react";
import profilePlaceholder from "../../assets/images/profile-placeholder.jpg";
import { Button, Input, Spinner } from "@heroui/react";
// import { createComment } from "../../services/PostsApi";
import { handleCommenting } from "../../helper/helpers";

export default function CreateComment({ id, post, setPost }) {
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // async function handleCommenting(e) {
  //   setIsLoading(true);
  //   e.preventDefault();
  //   if (comment.trim().length < 2 || comment.trim().length > 30) {
  //     return;
  //   }
  //   const response = await createComment({ content: comment, post: id });
  //   console.log(response);

  //   if (response.message == "success") {
  //     setComment("");
  //     setPost({ ...post, comments: response.comments.reverse() });
  //   }
  //   setIsLoading(false);
  // }

  return (
    <div className="flex gap-3 px-4 py-3">
      <div className="image">
        <img
          onError={(e) => {
            e.target.src = profilePlaceholder;
          }}
          src={profilePlaceholder}
          className="rounded-full w-11 h-10"
          alt=""
        />
      </div>
      <div className="w-full relative">
        <form
          onSubmit={(e) =>
            handleCommenting(
              e,
              setIsLoading,
              comment,
              id,
              setComment,
              setPost,
              post
            )
          }
        >
          <Input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write a comment..."
            className=""
            style={{ paddingRight: "80px" }}
            autoFocus={true}
            id="comment"
            isDisabled={isLoading}
          />
          <Button
            type="submit"
            variant="light"
            className="absolute right-0 top-0"
            isDisabled={
              comment.trim().length < 2 ||
              comment.trim().length > 30 ||
              isLoading
                ? true
                : false
            }
          >
            {isLoading ? (
              <Spinner />
            ) : (
              <i
                className="fa-solid fa-paper-plane fa-rotate-by"
                style={{ transform: "rotate(45deg)" }}
              />
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
