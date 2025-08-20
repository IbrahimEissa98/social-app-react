import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  // addToast,
  // useDisclosure,
} from "@heroui/react";
import DeleteModal from "./DeleteModal";
import EditPostModal from "../EditPostModal";
// import { useEffect } from "react";
import { copyToClipboard } from "../../helper/helpers";
// import { deletePostApi } from "../../services/PostsApi";
// import { useNavigate } from "react-router-dom";

export default function DropdownActions({
  isUser,
  post,
  inFeed,
  // posts,
  // setPosts,
  // handelDeleting,
  // isDeleting,
  isPost,
  style,
  setIsInUpdateMode,
  setPost,
  // isOpen,
  onOpen,
  // onOpenChange,
  setIsPost,
  // isNavigate,
  setCurrentComment,
  comment,
  onOpenCreatePost,
  setIsCreate,
}) {
  // useEffect(() => {
  //   isPost ? setIsPost(true) : setIsPost(false);
  // }, []);
  // const navigate = useNavigate();

  // async function handelDeleting() {
  //   if (!isUser) {
  //     return;
  //   }
  //   const response = await deletePostApi(post.id);
  //   if (response.message == "success") {
  //     if (inFeed) {
  //       setPosts(
  //         posts.filter((currentPost) => {
  //           return currentPost.id == post.id ? null : currentPost;
  //         })
  //       );
  //     } else {
  //       addToast({
  //         title: `Post Deleted Successfully`,
  //         color: "success",
  //       });
  //       navigate("/");
  //     }
  //   }
  // }
  // const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // function copyToClipboard() {
  //   navigator.clipboard.writeText(
  //     inFeed ? location.href + "post-details/" + post.id : location.href
  //   );
  //   addToast({
  //     title: `Link Copied to Clipboard successfully`,
  //     color: "success",
  //   });
  // }

  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <Button
            variant="light"
            className="cancel flex gap-4 items-center cursor-pointer p-0 min-w-fit h-8 w-8 rounded-full"
          >
            <i className={`fa-solid fa-ellipsis text-xl ${style}`} />
            {/* <p className="hidden">menu</p> */}
          </Button>
        </DropdownTrigger>
        <DropdownMenu>
          {isPost && (
            <DropdownItem
              onPress={() => {
                copyToClipboard(inFeed, post.id);
              }}
              key="copy"
              textValue="Copy Link"
            >
              <i className="fa-solid fa-clipboard me-2"></i>
              <span>Copy Link</span>
            </DropdownItem>
          )}
          {isUser && (
            <>
              {isPost ? (
                <DropdownItem
                  key="edit"
                  onPress={() => {
                    setIsCreate(false);
                    setPost(post);
                    onOpenCreatePost();
                  }}
                  textValue="Edit Post"
                >
                  <i className="fa-solid fa-pen-to-square me-2"></i>
                  <span>Edit Post</span>
                </DropdownItem>
              ) : (
                <DropdownItem
                  key="edit"
                  onPress={() => setIsInUpdateMode(true)}
                  textValue="Edit Comment"
                >
                  <i className="fa-solid fa-pen-to-square me-2"></i>
                  <span>Edit Comment</span>
                </DropdownItem>
              )}
              <DropdownItem
                // onPress={handelDeleting}
                onPress={() => {
                  if (isPost) {
                    setPost(post);
                    setIsPost(true);
                  } else {
                    setCurrentComment(comment);
                    setIsPost(false);
                  }
                  onOpen();
                }}
                key="delete"
                className="text-danger"
                color="danger"
                textValue="Delete"
              >
                <i className="fa-solid fa-trash-can me-2"></i>
                <span>Delete {isPost ? "Post" : "Comment"}</span>
              </DropdownItem>
            </>
          )}
        </DropdownMenu>
      </Dropdown>
      {/* <DeleteModal
        title={isPost ? "post" : "Comment"}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        handelDeleting={handelDeleting}
        isDeleting={isDeleting}
      /> */}
      {/* <EditPostModal
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
      /> */}
    </>
  );
}
