// import React, { useContext, useRef, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  // useDisclosure,
} from "@heroui/react";
import PostBody from "./PostBody";
import PostHeader from "./PostHeader";
import Post from "./Post";
import { useContext } from "react";
import { isLoginContext } from "../../contexts/IsLoginContext";
import { getPosts, getUserPosts } from "../../helper/helpers";
// import { createdAt } from "../../helper/helpers";

export default function PostModal({
  post,
  isOpenModal,
  onOpen,
  onCloseModal,
  setPost,
  isOpen,
  onOpenChange,
  setIsPost,
  setCurrentComment,
  setPosts,
  inProfilePage = false,
  profileId = null,
  setIsLoadingProfile = null,
}) {
  const { setIsLogin } = useContext(isLoginContext);
  return (
    <>
      <Modal
        backdrop={"blur"}
        isOpen={isOpenModal}
        // onClose={onCloseModal}
        onClose={() => {
          inProfilePage
            ? getUserPosts(profileId, setPosts, setIsLoadingProfile)
            : getPosts(setPosts, setIsLogin);
          onCloseModal();
        }}
        placement="center"
        size="xl"
      >
        <ModalContent>
          {
            <>
              <ModalHeader className="flex justify-center border-b border-divider text-lg font-bold">
                {post?.user.name}'s Post
              </ModalHeader>
              <ModalBody className="px-0! py-0! pb-16!">
                <Post
                  // key={post.id}
                  // number={index}
                  post={post}
                  commentsNum={5}
                  isNavigate={true}
                  // posts={posts}
                  setPosts={setPosts}
                  // handelDeletingPost={handelDeletingPost}
                  setPost={setPost}
                  isOpen={isOpen}
                  onOpen={onOpen}
                  onOpenChange={onOpenChange}
                  setIsPost={setIsPost}
                  isPost={true}
                  setCurrentComment={setCurrentComment}
                  // onOpenPostModal={onOpenPostModal}
                  // handelOpenModal={onOpen}
                  // setChoosePost={setChoosePost}
                  style={"min-h-80 max-h-96 overflow-auto"}
                />
              </ModalBody>
            </>
          }
        </ModalContent>
      </Modal>
    </>
  );
}
