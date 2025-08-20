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
import { isLoginContext } from "../contexts/IsLoginContext";
import { getLoggedUserDataApi } from "../services/loginAuth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PassToggle from "./PassToggle";
import { changePasswordSchema } from "../schemas/changePassSchema";
import { changePasswordApi, UpdateProfilePhotoApi } from "../services/userApi";

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
  const [errMsg, setErrMsg] = useState("");
  const [isVisiblePass, setIsVisiblePass] = useState(false);
  const [isVisibleNewPass, setIsVisibleNewPass] = useState(false);
  const [isVisibleRePass, setIsVisibleRePass] = useState(false);

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

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      password: "",
      newPassword: "",
    },
    mode: "onTouched",
    resolver: zodResolver(changePasswordSchema),
  });
  console.log(errors);

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

  // async function handleChangePassword(e) {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   const formData = new FormData();
  //   if (image != null) {
  //     formData.append("image", image);
  //   }
  //   const response = await createPost(formData);
  //   if (response.message == "success") {
  //     // await getUserAgain();
  //     setIsLoading(false);
  //     handleCloseBox();
  //     addToast({
  //       title: `Password Changed Successfully`,
  //       color: "success",
  //     });
  //   } else {
  //     addToast({
  //       title: `Failed to Change Password`,
  //       color: "danger",
  //     });
  //   }
  // }

  async function handleChangePassword(formData) {
    console.log(formData);
    setErrMsg("");
    setIsLoading(true);
    const response = await changePasswordApi({
      password: formData.password,
      newPassword: formData.newPassword,
    });
    console.log(response);

    if (response.message == "success") {
      // await getLoggedUserData();
      addToast({
        title: `Password Changed Successfully`,
        description: `You can now use your new password to login again`,
        color: "success",
      });
      reset();
      onClose();
    } else {
      setErrMsg(response.error);
    }

    setIsLoading(false);

    // if (!response.error) {
    //   setTimeout(() => {
    //     navigate("/login");
    //   }, 2000);
    // }
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
          reset();
          setIsVisiblePass(false);
          setIsVisibleNewPass(false);
          setIsVisibleRePass(false);
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
                  <form onSubmit={handelUpdatePhoto} className="w-full">
                    {imagePreview && (
                      <div
                        className={`relative rounded-3xl overflow-hidden w-full max-h-56`}
                      >
                        <img
                          src={imagePreview}
                          className="w-full min-h-52 max-h-64 object-contain"
                          alt="Image Preview"
                        />
                      </div>
                    )}

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
                      isLoading={isLoading}
                      color="primary"
                    >
                      {isLoading ? "Updating..." : "Update Photo"}
                    </Button>
                  </form>
                ) : (
                  <form
                    onSubmit={handleSubmit(handleChangePassword)}
                    className="w-full"
                  >
                    <div className="flex flex-col gap-3 my-3">
                      <div className="w-full relative">
                        <div className="absolute z-20 right-5 top-7 -translate-y-1/2">
                          <PassToggle
                            isVisible={isVisiblePass}
                            setIsVisible={setIsVisiblePass}
                          />
                        </div>
                        <Input
                          label="Current Password"
                          type={`${!isVisiblePass ? "password" : "text"}`}
                          {...register("password")}
                          isInvalid={Boolean(errors.password?.message)}
                          errorMessage={errors.password?.message}
                        />
                      </div>
                      <div className="w-full relative">
                        <div className="absolute z-20 right-5 top-7 -translate-y-1/2">
                          <PassToggle
                            isVisible={isVisibleNewPass}
                            setIsVisible={setIsVisibleNewPass}
                          />
                        </div>
                        <Input
                          label="New Password"
                          type={`${!isVisibleNewPass ? "password" : "text"}`}
                          {...register("newPassword")}
                          isInvalid={Boolean(errors.newPassword?.message)}
                          errorMessage={errors.newPassword?.message}
                        />
                      </div>
                      <div className="w-full relative">
                        <div className="absolute z-20 right-5 top-7 -translate-y-1/2">
                          <PassToggle
                            isVisible={isVisibleRePass}
                            setIsVisible={setIsVisibleRePass}
                          />
                        </div>
                        <Input
                          label="Confirm Password"
                          type={`${!isVisibleRePass ? "password" : "text"}`}
                          {...register("rePassword")}
                          isInvalid={Boolean(errors.rePassword?.message)}
                          errorMessage={errors.rePassword?.message}
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full text-lg font-semibold my-4 disabled:cursor-not-allowed"
                      isDisabled={isLoading ? true : false}
                      isLoading={isLoading}
                      color="primary"
                    >
                      {isLoading ? "Changing Password..." : "Change Password"}
                    </Button>
                    {errMsg && (
                      <p className="text-center text-sm bg-red-400 text-red-800 rounded-2xl w-fit mx-auto px-4 py-1 mt-2 first-letter:capitalize">
                        {errMsg}
                      </p>
                    )}
                  </form>
                )}
              </ModalBody>
            </>
          }
        </ModalContent>
      </Modal>
    </>
  );
}
