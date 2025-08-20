import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  addToast,
  // useDisclosure,
} from "@heroui/react";
import CreatePost from "./CreatePost";
import PostHeader from "./postComponents/PostHeader";
import { createPost, updatePostApi } from "../services/postsApi";
import { isLoginContext } from "../contexts/IsLoginContext";

export default function CreatePostBox({
  title,
  getPosts,
  onClose,
  isOpen,
  oldBody,
  oldImage,
  isCreate,
  setIsCreate,
  post,
}) {
  const { user } = useContext(isLoginContext);
  // const { isOpen, onOpen, onClose } = useDisclosure();

  const [body, setBody] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    if (isCreate) {
      setBody("");
      setImage(null);
      setImagePreview("");
    } else {
      setBody(oldBody);
      setImage(convertUrlToFile(oldImage));
      setImagePreview(oldImage);
    }
  }, [isCreate]);
  // useEffect(() => {
  //   if (oldImage) {
  //     setImagePreview(oldImage);
  //   }
  // }, [oldImage]);

  // useEffect(() => {
  //   if (image) {
  //     setImagePreview(URL.createObjectURL(image));
  //   }
  // }, [image]);

  function handleUploadImage(e) {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
      inputRef.current.value = "";
    }
  }

  function convertUrlToFile(url) {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const file = new File([blob], "image.jpg", { type: blob.type });
        setImage(file);
        // return file;
      })
      .catch((error) => {
        console.log(error);
        // return null;
      });
  }

  async function handleCreatePost(e) {
    e.preventDefault();
    if (body.trim() == "" && image == null) {
      return;
    }
    setIsLoading(true);
    const formData = new FormData();
    if (body.trim() != "") {
      formData.append("body", body);
    }
    if (image != null) {
      formData.append("image", image);
    }
    const response = await createPost(formData);
    if (response.message == "success") {
      await getPosts();
      setIsLoading(false);
      handleCloseBox();
      addToast({
        title: `Post Created Successfully`,
        color: "success",
      });
    } else {
      addToast({
        title: `Failed to create post`,
        color: "danger",
      });
    }
  }

  async function handelUpdatingPost(e) {
    e.preventDefault();
    if (body.trim() == "" && image == null) {
      return;
    }
    setIsLoading(true);
    const formData = new FormData();
    if (body.trim() != "") {
      formData.append("body", body);
    }
    if (image != null) {
      formData.append("image", image);
    }
    console.log(formData);

    const response = await updatePostApi(post._id, formData);
    if (response.message == "success") {
      await getPosts();
      handleCloseBox();
      addToast({
        title: `Post Updated Successfully`,
        color: "success",
      });
    } else {
      addToast({
        title: `Failed to update post`,
        color: "danger",
      });
    }
    setIsLoading(false);
  }

  function handleCloseBox() {
    onClose();
    setBody("");
    setImage(null);
    setImagePreview("");
  }

  // console.log(image);

  return (
    <>
      {/* <CreatePost handleOpen={onOpen} /> */}

      <Modal
        backdrop={"blur"}
        isOpen={isOpen}
        onClose={() => {
          handleCloseBox();
          setIsCreate(true);
        }}
        // onClose={onClose}
        placement="center"
        size="lg"
      >
        <ModalContent>
          {
            <>
              <ModalHeader className="flex justify-center border-b border-divider text-lg font-bold">
                {title}
              </ModalHeader>
              <ModalBody>
                <PostHeader name={user?.name} photo={user?.photo} />
                <form
                  onSubmit={isCreate ? handleCreatePost : handelUpdatingPost}
                  className="w-full"
                >
                  <div className="overflow-auto max-h-72">
                    <textarea
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                      autoFocus
                      className="resize-none w-full focus:outline-0 text-2xl h-20"
                      placeholder={`What's on your mind, ${user?.name}?`}
                      id="createPost"
                    ></textarea>

                    {/* Image preview */}
                    {imagePreview && (
                      <div
                        className={`relative rounded-3xl overflow-hidden w-full`}
                      >
                        {/* <div className="w-full h-full "></div> */}
                        <img
                          src={imagePreview}
                          className="block mx-auto"
                          alt="Image Preview"
                        />
                        <div
                          onClick={() => {
                            setImage(null);
                            setImagePreview("");
                          }}
                          className="absolute top-4 right-4 text-danger cursor-pointer"
                        >
                          <i className="fa-regular fa-circle-xmark text-2xl"></i>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Upload Photo */}
                  <label className="mt-4 block cursor-pointer">
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleUploadImage}
                      ref={inputRef}
                    />
                    <div className="flex items-center">
                      <i
                        className="fa-solid fa-images"
                        style={{ color: "rgb(41, 192, 41)" }}
                      />
                      <p className="ms-2 font-semibold text-sm">Photo</p>
                    </div>
                  </label>
                  <Button
                    type="submit"
                    className="w-full text-lg font-semibold my-4 disabled:cursor-not-allowed"
                    isDisabled={
                      isLoading || (body.trim() == "" && image == null)
                        ? true
                        : false
                    }
                    // disabled={isLoading || (body == "" && image == null)}
                    isLoading={isLoading}
                    color="primary"
                    // style={{}}
                    // onPress={onClose}
                  >
                    {isCreate
                      ? isLoading
                        ? "Posting..."
                        : "Post"
                      : isLoading
                      ? "Updating..."
                      : "Update"}
                    {/* {isLoading ? "Posting..." : "Post"} */}
                  </Button>
                </form>
              </ModalBody>
            </>
          }
        </ModalContent>
      </Modal>
    </>
  );
}
