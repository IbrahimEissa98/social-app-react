import React, { useContext, useEffect, useState } from "react";
import { isLoginContext } from "../contexts/IsLoginContext";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@heroui/modal";
import Post from "../components/postComponents/Post";
import {
  getUserPosts,
  handelDeletingComment,
  handelDeletingPost,
} from "../helper/helpers";
import IsLoadingPost from "../components/IsLoadingPost";
import DeleteModal from "../components/postComponents/DeleteModal";
import PostModal from "../components/postComponents/PostModal";
import CreatePostBox from "../components/CreatePostBox";
import { Button, Spinner } from "@heroui/react";
import CreatePost from "../components/CreatePost";
import ChangePhotoPasswordModal from "../components/ChangePhotoPasswordModal";
import { getLoggedUserDataApi } from "../services/loginAuth";

export default function ProfilePage() {
  // const { id } = useParams();
  const { user } = useContext(isLoginContext);
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState(null);
  const [isPost, setIsPost] = useState(false);
  const [isCreate, setIsCreate] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [currentComment, setCurrentComment] = useState(null);
  const [isUpdatePhoto, setIsUpdatePhoto] = useState(false);
  // const { setIsLogin } = useContext(isLoginContext);
  const navigate = useNavigate();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const {
    isOpen: isOpenCreatePost,
    onOpen: onOpenCreatePost,
    // onOpenChange: onOpenChangeCreatePost,
    onClose: onCloseCreatePost,
  } = useDisclosure();
  const {
    isOpen: isOpenPostModal,
    onOpen: onOpenPostModal,
    // onOpenChange: onOpenChangePostModal,
    onClose: onClosePostModal,
  } = useDisclosure();
  const {
    isOpen: isOpenPhotoPasswordModal,
    onOpen: onOpenPhotoPasswordModal,
    // onOpenChange: onOpenChangePhotoPasswordModal,
    onClose: onClosePhotoPasswordModal,
  } = useDisclosure();

  useEffect(() => {
    window.scrollTo(0, 0);
    getUserPosts(user?._id, setPosts, setIsLoadingProfile);
    // setIsLoadingProfile(false);
  }, [user?._id]);

  return (
    <>
      {isLoadingProfile ? (
        <div className="h-screen flex justify-center items-center">
          <Spinner className="flex justify-center items-center" />
        </div>
      ) : (
        <>
          <div className="flex items-center justify-center flex-col">
            <div className="flex items-center justify-center gap-3">
              <img
                src={user?.photo}
                className="w-[250px] h-[250px] rounded-full"
                alt=""
              />
              <h3 className="text-center mt-2 text-5xl uppercase font-bold">
                {user?.name}
              </h3>
            </div>
            <div className="flex mt-5 gap-3">
              <Button
                color="primary"
                onPress={() => {
                  setIsUpdatePhoto(true);
                  onOpenPhotoPasswordModal();
                }}
              >
                Update Profile Photo
              </Button>
              <Button
                color="danger"
                onPress={() => {
                  setIsUpdatePhoto(false);
                  onOpenPhotoPasswordModal();
                }}
              >
                Change Password
              </Button>
            </div>
          </div>
          <div className="grid gap-2 pb-5 w-full! mt-5">
            {posts.length == 0 ? (
              <>
                <IsLoadingPost />
                <IsLoadingPost />
              </>
            ) : (
              <>
                <CreatePost handleOpen={onOpenCreatePost} />
                {/* <CreatePostBox getPosts={getPosts} /> */}
                {posts.map((post, index) => (
                  <Post
                    key={post.id}
                    number={index}
                    post={post}
                    commentsNum={0}
                    isNavigate={true}
                    posts={posts}
                    setPosts={setPosts}
                    // handelDeletingPost={handelDeletingPost}
                    setPost={setPost}
                    isOpen={isOpen}
                    onOpen={onOpen}
                    onOpenChange={onOpenChange}
                    setIsPost={setIsPost}
                    onOpenPostModal={onOpenPostModal}
                    onOpenCreatePost={onOpenCreatePost}
                    setIsCreate={setIsCreate}
                    inProfilePage={true}
                    // handelOpenModal={onOpen}
                    // setChoosePost={setChoosePost}
                  />
                ))}
              </>
            )}
            <DeleteModal
              title={isPost ? "post" : "Comment"}
              isOpen={isOpen}
              onOpenChange={onOpenChange}
              // handelDeleting={() =>
              //   handelDeletingPost(
              //     onClose,
              //     true,
              //     user._id,
              //     post,
              //     setIsDeleting,
              //     setPosts,
              //     posts,
              //     navigate
              //   )
              // }
              handelDeleting={
                isPost
                  ? () =>
                      handelDeletingPost(
                        onClose,
                        true,
                        user._id,
                        post,
                        setIsDeleting,
                        setPosts,
                        posts,
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
              isNavigate={true}
              onClosePostModal={onClosePostModal}
            />
            <CreatePostBox
              title={!isCreate ? "Edit Post" : "Create Post"}
              getPosts={() =>
                getUserPosts(user?._id, setPosts, setIsLoadingProfile)
              }
              isOpen={isOpenCreatePost}
              onClose={onCloseCreatePost}
              oldBody={post?.body}
              oldImage={post?.image}
              isCreate={isCreate}
              setIsCreate={setIsCreate}
              post={post}
            />
            {posts.length != 0 && (
              <PostModal
                post={post}
                isOpenModal={isOpenPostModal}
                onCloseModal={onClosePostModal}
                // onOpen={onOpen}
                setPost={setPost}
                setPosts={setPosts}
                isOpen={isOpen}
                onOpen={onOpen}
                onOpenChange={onOpenChange}
                setIsPost={setIsPost}
                setCurrentComment={setCurrentComment}
                isNavigate={true}
                inProfilePage={true}
                profileId={user?._id}
                setIsLoadingProfile={setIsLoadingProfile}
              />
            )}
            <ChangePhotoPasswordModal
              title={isUpdatePhoto ? "Update Profile Photo" : "Change Password"}
              getUserAgain={getLoggedUserDataApi}
              isOpen={isOpenPhotoPasswordModal}
              onClose={onClosePhotoPasswordModal}
              oldPhoto={user?.photo}
              isUpdatePhoto={isUpdatePhoto}
              setIsUpdatePhoto={setIsUpdatePhoto}
              // userId={user?._id}
            />
          </div>
        </>
      )}
    </>
  );
}
