import axios from "axios";

const baseUrl = "https://linked-posts.routemisr.com/";

export async function UpdateProfilePhotoApi(formData) {
  try {
    const { data } = await axios.put(baseUrl + "users/upload-photo", formData, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    return error.response ? error.response.data : error.message;
  }
}

export async function changePasswordApi(formData) {
  try {
    const { data } = await axios.patch(
      baseUrl + "users/change-password",
      formData,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    return data;
  } catch (error) {
    console.log(error);
    return error.response ? error.response.data : error.message;
  }
}
