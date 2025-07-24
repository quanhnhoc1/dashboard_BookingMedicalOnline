import axios from "axios";
const api_login = "http://localhost:3000/login";
const api_profile = "http://localhost:3000/profile";
const api_google_login = "http://localhost:3000/auth/google";

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

async function googleLogin(googleToken) {
  try {
    console.log("=== AuthService Google Login Debug ===");
    console.log("Token length:", googleToken ? googleToken.length : 0);
    console.log(
      "Token starts with:",
      googleToken ? googleToken.substring(0, 50) + "..." : "null"
    );
    console.log(
      "Token ends with:",
      googleToken
        ? "..." + googleToken.substring(googleToken.length - 50)
        : "null"
    );

    // Kiểm tra token có tồn tại và có độ dài hợp lý
    console.log("=== AuthService Validation Debug ===");
    console.log("Token exists:", !!googleToken);
    console.log("Token length:", googleToken ? googleToken.length : 0);
    console.log("Minimum required:", 20);
    console.log(
      "Is token valid length:",
      googleToken ? googleToken.length >= 20 : false
    );

    if (!googleToken) {
      console.log("❌ Token is null/undefined");
      throw new Error("Không nhận được Google token");
    }

    // Google token/code thường có độ dài từ 50-2000 ký tự
    if (googleToken.length < 20) {
      console.log("❌ Token too short:", googleToken.length);
      throw new Error("Google token quá ngắn, có thể bị lỗi");
    }

    console.log("✅ AuthService token validation passed");

    const response = await axios.post(api_google_login, {
      token: googleToken,
    });
    console.log("Google login response:", response.data);
    return response.data;
  } catch (error) {
    throw (
      error.response?.data?.message || "Google login failed. Please try again."
    );
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
export { Login, googleLogin, getUserProfile };
