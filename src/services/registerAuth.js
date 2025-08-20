import axios from "axios";

const baseUrl = "https://linked-posts.routemisr.com/";

export async function registerApi(registerData) {
  try {
    const { data } = await axios.post(baseUrl + "users/signup", registerData);
    return data;
  } catch (error) {
    // return error.response.data;
    return error.response ? error.response.data : error.message;
  }
}
