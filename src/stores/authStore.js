import { defineStore } from "pinia";
import { Login as loginApi } from "../services/authService.js";
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
