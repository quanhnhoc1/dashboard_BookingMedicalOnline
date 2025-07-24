import { defineStore } from "pinia";
import {
  Login as loginApi,
  googleLogin as googleLoginApi,
} from "../services/authService.js";
import axios from "axios";
export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")) || null,
    getProfile: {},
    token: localStorage.getItem("token") || null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    userRole: (state) => (state.user ? state.user.role : ""),
    userName: (state) => (state.user ? state.user.fullName : ""),
    isLoggedIn: (state) => !!state.token && !!state.user,
  },
  actions: {
    async login({ user: email, password }) {
      try {
        const res = await loginApi(email, password);

        this.user = res.user;
        this.token = res.token;

        localStorage.setItem("user", JSON.stringify(res.user));
        localStorage.setItem("token", res.token);
      } catch (error) {
        throw error;
      }
    },
    async googleLogin(googleToken) {
      try {
        console.log("=== Google Login Debug ===");
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
        console.log("=== Validation Debug ===");
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

        console.log("✅ Token validation passed");

        const res = await googleLoginApi(googleToken);

        this.user = res.user;
        this.token = res.token;

        localStorage.setItem("user", JSON.stringify(res.user));
        localStorage.setItem("token", res.token);
      } catch (error) {
        throw error;
      }
    },
    async fetchUser() {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:3000/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      this.getProfile = res.data;
    },
    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});
