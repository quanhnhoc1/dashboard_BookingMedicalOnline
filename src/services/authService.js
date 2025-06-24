import axios from "axios";
const api_login = "http://localhost:3000/login";
const api_profile = "http://localhost:3000/profile";

async function Login(email, password) {
  try {
    const response = await axios.post(api_login, {
      email,
      password,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Login failed. Please try again.";
  }
}

async function getUserProfile(token) {
  try {
    const response = await axios.get(api_profile, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("User profile:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error getting profile:", error.response?.data?.message);
    throw error.response?.data?.message || "Không thể lấy thông tin người dùng";
  }
}
export { Login, getUserProfile };
