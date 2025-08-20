import React from "react";

export default function IsLoadingPost() {
  return (
    <>
      <div className="w-full! bg-white dark:bg-post-dark shadow-sm rounded-md">
        <div className="posts-profile flex justify-between p-4">
          <div className="photo-name flex items-center">
            <div className="overflow-hidden rounded-full w-11 h-11 bg-move"></div>
            <div className="name-time ms-2 w-52 h-11 *:h-5 *:rounded-2xl">
              <p className="span1 w-full bg-move"></p>
              <p className="span2 w-30 mt-1 bg-move"></p>
            </div>
          </div>
        </div>

        <div className="post-img my-1">
          <span className="w-1/2 mx-auto rounded-2xl h-32 object-cover bg-move block"></span>
        </div>

        <div className="reacts-btns flex py-0.5 mx-2 mt-2 justify-around *:px-4 *:py-1.5 *:rounded-lg ">
          <div className="flex items-center justify-center">
            <p className="w-20 h-4 rounded-2xl bg-move"></p>
          </div>
          <div className="flex items-center justify-center">
            <p className="w-20 h-4 rounded-2xl bg-move"></p>
          </div>
          <div className="flex items-center justify-center">
            <p className="w-20 h-4 rounded-2xl bg-move"></p>
          </div>
        </div>
      </div>
    </>
  );
}
