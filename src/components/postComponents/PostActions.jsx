import { Button } from "@heroui/react";
import React from "react";
import { Link } from "react-router-dom";

export default function PostActions({
  // id,
  isNavigate,
  setPost,
  post,
  handelOpenModal,
  // setChoosePost,
  // number,
}) {
  // const navigate = useNavigate();
  // function handleNavigate() {}
  // if (isNavigate) {
  //   navigate(`post-details/${id}`);
  // }
  return (
    <>
      <div className="reacts-btns flex py-0.5 border-t border-divider mx-2 mt-2 justify-around text-gray-600 dark:text-slate-300 *:cursor-pointer *:px-4 *:py-1.5 *:rounded-lg *:hover:bg-gray-100 *:dark:hover:bg-base-dark *:transition-all *:duration-300">
        <div className="flex items-center justify-center">
          <i className="fa-sharp fa-regular fa-thumbs-up me-1.5" />
          <p>Like</p>
        </div>
        <div
          // to={isNavigate && `post-details/${id}`}
          onClick={
            handelOpenModal &&
            (() => {
              if (isNavigate) {
                setPost(post);
                handelOpenModal();
              }
            })
          }
          className="flex items-center justify-center"
          // color="default"
          // variant="light"
        >
          <i className="fa-sharp fa-regular fa-message me-1.5" />
          <p>Comment</p>
        </div>
        <div className="flex items-center justify-center">
          <i className="fa-solid fa-share-from-square me-1.5" />
          <p>Share</p>
        </div>
      </div>
    </>
  );
}
