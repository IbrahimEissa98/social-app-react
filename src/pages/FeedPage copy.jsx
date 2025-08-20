import React, { useContext, useEffect, useState } from "react";
import CreatePost from "../components/CreatePost";
import Post from "../components/postComponents/Post";
import { postsApi } from "../services/PostsApi";
import { isLoginContext } from "../contexts/IsLoginContext";
import { addToast } from "@heroui/toast";
import IsLoadingPost from "../components/IsLoadingPost";
import CreatePostBox from "../components/CreatePostBox";
import CreatePostBoxZod from "../components/CreatePostBoxZod";
// import { userContext } from "../contexts/UserContext";

export default function FeedPage() {
  const [posts, setPosts] = useState([]);
  const { setIsLogin } = useContext(isLoginContext);
  // const { setUser } = useContext(userContext);

  // const timer = setInterval(getPosts, 10000);

  async function getPosts() {
    const data = await postsApi();
    console.log(data);

    if (data.message == "success") {
      setPosts(data.posts);
      console.log(data.posts);
    } else if (data == "Network Error") {
      addToast({
        title: `Network Error`,
      });
    } else {
      console.log(data.error);
      localStorage.removeItem("token");
      setIsLogin(false);
      addToast({
        title: `Invalid Token, Try to login again`,
      });
    }
  }

  useEffect(() => {
    getPosts();
    // setUser(JSON.parse(localStorage.getItem("userData")));

    // clearInterval(timer);
  }, []);

  return (
    <>
      <div className="grid gap-2 pb-5 w-full">
        {/* <CreatePost /> */}
        <CreatePostBox getPosts={getPosts} />
        {posts.length == 0 ? (
          <>
            <IsLoadingPost />
            <IsLoadingPost />
          </>
        ) : (
          posts.map((post) => (
            <Post key={post.id} post={post} commentsNum={0} isNavigate={true} />
          ))
        )}
      </div>
    </>
  );
}
