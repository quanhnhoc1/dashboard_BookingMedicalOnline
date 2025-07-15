import { defineStore } from "pinia";
import {
  addAppointmentByUserServices as addAppointmentByUser,
  updateProfile,
} from "@/services/userServices";
export const useUserStore = defineStore("user", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
    appointment: {},
    // userWi,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    userRole: (state) => (state.user ? state.user.role : ""),
    userName: (state) => (state.user ? state.user.fullName : ""),
    isLoggedIn: (state) => !!state.token && !!state.user,
  },
  actions: {
    async addAppointmentByUser(appointmentData) {
      try {
        const res = await addAppointmentByUser(appointmentData);
        this.appointment = res;
        return res;
      } catch (error) {
        throw error;
      }
    },
    async updateProfile(userData) {
      try {
        const res = await updateProfile(userData);
        this.user = res;
        localStorage.setItem("user", JSON.stringify(res));
        return res;
      } catch (error) {
        throw error;
      }
    },
  },
});
