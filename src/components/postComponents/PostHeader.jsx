import React from "react";
import { Link } from "react-router-dom";

export default function PostHeader({ photo, name, time }) {
  return (
    <div className="photo-name flex items-center">
      <div
        className="overflow-hidden rounded-full w-11 h-10"
        // to={`/profile/${id}`}
      >
        <img className="rounded-full w-full" src={photo} alt={name} />
      </div>
      <div className="name-time ms-2">
        <span className="span1 text-lg font-bold">
          <p>{name}</p>
        </span>
        <span className="span2 flex items-center text-gray-500 text-xs">
          <p className="">{time}</p>
        </span>
      </div>
    </div>
  );
}
