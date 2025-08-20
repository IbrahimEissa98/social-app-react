import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  addToast,
  Input,
} from "@heroui/react";
import PostHeader from "./postComponents/PostHeader";
import { createPost, UpdateProfilePhotoApi } from "../services/PostsApi";
import { isLoginContext } from "../contexts/IsLoginContext";
import { getLoggedUserDataApi } from "../services/loginAuth";

export default function ChangePhotoPasswordModal({
  title,
  // getUserAgain,
  isOpen,
  onClose,
  oldPhoto,
  isUpdatePhoto,
  // setIsUpdatePhoto,
  // userId,
}) {
  const { user, setUser, setIsLogin } = useContext(isLoginContext);
  // const { isOpen, onOpen, onClose } = useDisclosure();

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const inputRef = useRef(null);

  // useEffect(() => {
  //   if (isCreate) {
  //     setBody("");
  //     setImage(null);
  //     setImagePreview("");
  //   } else {
  //     setBody(oldBody);
  //     setImage(convertUrlToFile(oldImage));
  //     setImagePreview(oldImage);
  //   }
  // }, [isCreate]);
  useEffect(() => {
    if (oldPhoto) {
      setImagePreview(oldPhoto);
    }
  }, [oldPhoto]);

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

  // function convertUrlToFile(url) {
  //   fetch(url)
  //     .then((response) => response.blob())
  //     .then((blob) => {
  //       const file = new File([blob], "image.jpg", { type: blob.type });
  //       setImage(file);
  //       // return file;
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       // return null;
  //     });
  // }

  async function getLoggedUserData() {
    const response = await getLoggedUserDataApi();
    if (response.message == "success") {
      setUser(response.user);
    } else if (response.message == "Network Error") {
      addToast({
        title: `Network Error`,
      });
    } else {
      setIsLogin(false);
      localStorage.removeItem("token");
      addToast({
        title: `Invalid Token, Try to login again`,
      });
    }
  }

  async function handleChangePassword(e) {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    if (image != null) {
      formData.append("image", image);
    }
    const response = await createPost(formData);
    if (response.message == "success") {
      // await getUserAgain();
      setIsLoading(false);
      handleCloseBox();
      addToast({
        title: `Password Changed Successfully`,
        color: "success",
      });
    } else {
      addToast({
        title: `Failed to Change Password`,
        color: "danger",
      });
    }
  }

  async function handelUpdatePhoto(e) {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    if (image != null) {
      formData.append("photo", image);
    }

    const response = await UpdateProfilePhotoApi(formData);
    if (response.message == "success") {
      await getLoggedUserData();
      handleCloseBox();
      addToast({
        title: `Profile Photo Updated Successfully`,
        color: "success",
      });
    } else {
      addToast({
        title: `Failed to update profile photo`,
        color: "danger",
      });
    }
    setIsLoading(false);
  }

  function handleCloseBox() {
    onClose();
    // setImage(null);
    // setImagePreview("");
  }

  return (
    <>
      <Modal
        backdrop={"blur"}
        isOpen={isOpen}
        onClose={() => {
          handleCloseBox();
          // setIsCreate(true);
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
                {isUpdatePhoto ? (
                  <form
                    onSubmit={
                      isUpdatePhoto ? handelUpdatePhoto : handleChangePassword
                    }
                    className="w-full"
                  >
                    {isUpdatePhoto ? (
                      imagePreview && (
                        <div
                          className={`relative rounded-3xl overflow-hidden w-full max-h-56`}
                        >
                          <img
                            src={imagePreview}
                            className="w-full min-h-52 max-h-64 object-contain"
                            alt="Image Preview"
                          />
                        </div>
                      )
                    ) : (
                      <div className="flex flex-col gap-3">
                        <Input placeholder="Enter Current Password" />
                        <Input placeholder="Enter New Password" />
                        <Input placeholder="Enter Confirm Password" />
                      </div>
                    )}
                    <div className="overflow-auto max-h-72">
                      {/* <textarea
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                      autoFocus
                      className="resize-none w-full focus:outline-0 text-2xl h-20"
                      placeholder={`What's on your mind, ${user?.name}?`}
                      id="createPost"
                    ></textarea> */}

                      {/* Image preview */}
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
                        <p className="ms-2 font-semibold text-sm">
                          Upload New Photo
                        </p>
                      </div>
                    </label>
                    <Button
                      type="submit"
                      className="w-full text-lg font-semibold my-4 disabled:cursor-not-allowed"
                      isDisabled={isLoading || image == null ? true : false}
                      // disabled={isLoading || (body == "" && image == null)}
                      isLoading={isLoading}
                      color="primary"
                      // style={{}}
                      // onPress={onClose}
                    >
                      {isUpdatePhoto
                        ? isLoading
                          ? "Updating..."
                          : "Update Photo"
                        : isLoading
                        ? "Changing Password..."
                        : "Change Password"}
                    </Button>
                  </form>
                ) : (
                  <form
                    onSubmit={
                      isUpdatePhoto ? handelUpdatePhoto : handleChangePassword
                    }
                    className="w-full"
                  >
                    {isUpdatePhoto ? (
                      imagePreview && (
                        <div
                          className={`relative rounded-3xl overflow-hidden w-full max-h-56`}
                        >
                          <img
                            src={imagePreview}
                            className="w-full min-h-52 max-h-64 object-contain"
                            alt="Image Preview"
                          />
                        </div>
                      )
                    ) : (
                      <div className="flex flex-col gap-3">
                        <Input placeholder="Enter Current Password" />
                        <Input placeholder="Enter New Password" />
                        <Input placeholder="Enter Confirm Password" />
                      </div>
                    )}
                    <div className="overflow-auto max-h-72">
                      {/* <textarea
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                      autoFocus
                      className="resize-none w-full focus:outline-0 text-2xl h-20"
                      placeholder={`What's on your mind, ${user?.name}?`}
                      id="createPost"
                    ></textarea> */}

                      {/* Image preview */}
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
                        <p className="ms-2 font-semibold text-sm">
                          Upload New Photo
                        </p>
                      </div>
                    </label>
                    <Button
                      type="submit"
                      className="w-full text-lg font-semibold my-4 disabled:cursor-not-allowed"
                      isDisabled={isLoading || image == null ? true : false}
                      // disabled={isLoading || (body == "" && image == null)}
                      isLoading={isLoading}
                      color="primary"
                      // style={{}}
                      // onPress={onClose}
                    >
                      {isUpdatePhoto
                        ? isLoading
                          ? "Updating..."
                          : "Update Photo"
                        : isLoading
                        ? "Changing Password..."
                        : "Change Password"}
                    </Button>
                  </form>
                )}
                <form
                  onSubmit={
                    isUpdatePhoto ? handelUpdatePhoto : handleChangePassword
                  }
                  className="w-full"
                >
                  {isUpdatePhoto ? (
                    imagePreview && (
                      <div
                        className={`relative rounded-3xl overflow-hidden w-full max-h-56`}
                      >
                        <img
                          src={imagePreview}
                          className="w-full min-h-52 max-h-64 object-contain"
                          alt="Image Preview"
                        />
                      </div>
                    )
                  ) : (
                    <div className="flex flex-col gap-3">
                      <Input placeholder="Enter Current Password" />
                      <Input placeholder="Enter New Password" />
                      <Input placeholder="Enter Confirm Password" />
                    </div>
                  )}
                  <div className="overflow-auto max-h-72">
                    {/* <textarea
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                      autoFocus
                      className="resize-none w-full focus:outline-0 text-2xl h-20"
                      placeholder={`What's on your mind, ${user?.name}?`}
                      id="createPost"
                    ></textarea> */}

                    {/* Image preview */}
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
                      <p className="ms-2 font-semibold text-sm">
                        Upload New Photo
                      </p>
                    </div>
                  </label>
                  <Button
                    type="submit"
                    className="w-full text-lg font-semibold my-4 disabled:cursor-not-allowed"
                    isDisabled={isLoading || image == null ? true : false}
                    // disabled={isLoading || (body == "" && image == null)}
                    isLoading={isLoading}
                    color="primary"
                    // style={{}}
                    // onPress={onClose}
                  >
                    {isUpdatePhoto
                      ? isLoading
                        ? "Updating..."
                        : "Update Photo"
                      : isLoading
                      ? "Changing Password..."
                      : "Change Password"}
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
