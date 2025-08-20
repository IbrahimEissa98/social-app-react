import axios from "axios";

const baseUrl = "https://linked-posts.routemisr.com/";

export async function loginApi(loginData) {
  try {
    const { data } = await axios.post(baseUrl + "users/signin", loginData);
    return data;
  } catch (error) {
    console.log(error);
    return error.response ? error.response.data : error.message;
  }
}

export async function getLoggedUserDataApi() {
  try {
    const { data } = await axios.get(baseUrl + "users/profile-data", {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return error.response ? error.response.data : error.message;
  }
}
