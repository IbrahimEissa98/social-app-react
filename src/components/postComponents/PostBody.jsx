import React from "react";
import { Link } from "react-router-dom";

export default function PostBody({ body, image }) {
  return (
    <>
      <div className="topic px-5 mb-2">
        <p>{body}</p>
      </div>
      {image && (
        <div className="post-img my-2">
          <img
            className="w-full min-h-64 max-h-80 object-contain"
            src={image}
            alt="Post image"
          />
        </div>
      )}
    </>
  );
}
