import React from "react";

export default function PostReactions({ commentsNum }) {
  return (
    <>
      <div className="reacts flex items-center justify-between px-4 dark:text-slate-200">
        <div className="left-reacts flex items-center">
          <span className="bg-blue-700 w-6 h-6 flex justify-center items-center rounded-full relative z-[3]">
            <i className="fa-solid fa-thumbs-up text-white text-sm" />
          </span>
          <p className="haha text-[22px] relative -ms-2 z-[2]">😂</p>
          <span className="bg-red-700 w-6 h-6 flex justify-center items-center rounded-full relative -ms-2">
            <i className="fa-solid fa-heart text-white text-sm" />
          </span>
          <p className="number text-gray-500 dark:text-slate-300 ps-1">
            {Math.floor(Math.random() * 200)}
          </p>
        </div>
        <div className="right-reacts flex items-center *:text-gray-500 *:dark:text-slate-300">
          <span className="flex items-center">
            <p className=" ">{commentsNum}</p>
            <i className="fa-solid fa-message  ps-1" />
          </span>
          <span className="flex items-center ms-3">
            <p className=" ">{Math.floor(Math.random() * 200)}</p>
            <i className="fa-solid fa-share  ps-1" />
          </span>
        </div>
      </div>
    </>
  );
}
