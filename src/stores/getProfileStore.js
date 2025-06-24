// import { defineStore } from "pinia";
// import { getUserProfile as getUserProfileApi } from "../services/authService.js";
// export const useAuthStore = defineStore("auth", {
//   state: () => ({
//     user: JSON.parse(localStorage.getItem("user")) || null,
//     token: localStorage.getItem("token") || null,
//   }),
//   getters: {
//     isAuthenticated: (state) => !!state.token,
//     userRole: (state) => (state.user ? state.user.role : ""),
//     userName: (state) => (state.user ? state.user.fullName : ""),
//     isLoggedIn: (state) => !!state.token && !!state.user,
//   },
//   actions: {
//     async fetchUserProfile() {
//       try {
//         const res = await getUserProfileApi(this.token); // Gửi token để lấy profile mới nhất
//         this.user = res;
//         localStorage.setItem("user", JSON.stringify(res));
//       } catch (error) {
//         throw error;
//       }
//     },
//     logout() {
//       this.user = null;
//       this.token = null;
//       localStorage.removeItem("user");
//       localStorage.removeItem("token");
//     },
//   },
// });
