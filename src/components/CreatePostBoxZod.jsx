import React, { useContext, useRef, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from "@heroui/react";
import CreatePost from "./CreatePost";
import PostHeader from "./postComponents/PostHeader";
import { userContext } from "../contexts/UserContext";
import { createPost } from "../services/PostsApi";
import * as zod from "zod";
import { useForm } from "react-hook-form";

export default function CreatePostBoxZod({ getPosts }) {
  const { user } = useContext(userContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [body, setBody] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const inputRef = useRef(null);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });

  function handleUploadImage(e) {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
      inputRef.current.value = "";
    }
  }

  async function handlePosting(e) {
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
    setIsLoading(false);
    if (response.message == "success") {
      handleCloseBox();
      getPosts();
    }
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
      <CreatePost handleOpen={onOpen} />

      <Modal
        backdrop={"blur"}
        isOpen={isOpen}
        onClose={handleCloseBox}
        // onClose={onClose}
        placement="center"
        size="lg"
      >
        <ModalContent>
          {
            <>
              <ModalHeader className="flex justify-center border-b border-divider text-lg font-bold">
                Create Post
              </ModalHeader>
              <ModalBody>
                <PostHeader name={user?.name} photo={user?.photo} />
                <form onSubmit={handleSubmit(handlePosting)} className="w-full">
                  <div className="overflow-auto max-h-72">
                    <textarea
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                      className="resize-none w-full focus:outline-0 text-2xl h-20"
                      placeholder={`What's on your mind, ${user?.name}?`}
                      {...register("body")}
                    ></textarea>

                    {/* Image preview */}
                    {imagePreview && (
                      <div
                        className={`relative rounded-3xl overflow-hidden w-full`}
                      >
                        {/* <div className="w-full h-full "></div> */}
                        <img
                          src={imagePreview}
                          className="block"
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
                      {...register("image")}
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
                    {isLoading ? "Posting..." : "Post"}
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
