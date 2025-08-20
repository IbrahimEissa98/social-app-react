import { Button, Input } from "@heroui/react";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import CreatePostBox from "./CreatePostBox";
import { isLoginContext } from "../contexts/IsLoginContext";

export default function CreatePost({ handleOpen }) {
  const { user } = useContext(isLoginContext);

  return (
    <>
      {/* <CreatePostBox /> */}
      <div className="w-full bg-white dark:bg-post-dark shadow-sm rounded-md p-3 pb-1">
        <div className="mind-typing flex items-center justify-between">
          <Link
            className="overflow-hidden rounded-full w-11 h-10"
            to={"/profile"}
          >
            <img
              className="rounded-full w-full"
              src={user?.photo}
              alt={user?.name}
            />
          </Link>
          <Button
            onPress={handleOpen}
            style={{ paddingInline: "15px" }}
            className="bg-gray-200 dark:bg-gray-600/50 w-full text-start px-8 py-2 ms-4 rounded-3xl sm:tracking-wide justify-start sm:text-medium"
          >
            What's on your mind, {user?.name} ?
          </Button>
          <span className="sm:hidden">
            <i
              className="fa-solid fa-images text-xl ms-2"
              style={{ color: "rgb(41, 192, 41)" }}
            />
          </span>
        </div>
        <div className="mind-icons sm:flex justify-around items-center border-t-1 border-divider py-2 mt-3 hidden *:cursor-pointer">
          <div className="Live-Video flex justify-center items-center">
            <i
              className="fa-solid fa-video"
              style={{ color: "rgb(241, 69, 69)" }}
            />
            <p className="ms-2">Live Video</p>
          </div>
          <div className="Photo-Video flex justify-center items-center">
            <i
              className="fa-solid fa-images"
              style={{ color: "rgb(41, 192, 41)" }}
            />
            <p className="ms-2">Photo/Video</p>
          </div>
          <div className="Feeling/Activity flex justify-center items-center">
            <i
              className="fa-regular fa-face-laugh-beam"
              style={{ color: "rgb(219, 219, 7)" }}
            />
            <p className="ms-2">Feeling/Activity</p>
          </div>
        </div>
      </div>
    </>
  );
}
