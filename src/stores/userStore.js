import { defineStore } from "pinia";
import {
  addAppointmentByUserServices as addAppointmentByUser,
  cancelAppointmentService,
  deleteUserProfileByIDService as deleteUserprofileStore,
  updateProfile,
  getListBookingTicketService,
  getUserProfileWithUserIDAndIDProfileService,
} from "@/services/userServices";
import { getUserProfile } from "@/services/authService";
import { jwtDecode } from "jwt-decode";

import axios from "axios";
import { computed } from "vue";
import { addNewAppointmentService } from "@/services/userServices";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
    appointment: {},
    UserProfile: [],
    UserProfileDetail: {},
    bookingTickets: [], // Thêm state cho booking tickets
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
        const res = await updateProfile(userData); // Gọi service
        if (res && res.success) {
          // Giả sử res.data là user đã cập nhật
          this.user = res.data;
          localStorage.setItem("user", JSON.stringify(res.data));
          return res.data;
        } else {
          throw new Error(res?.message || "Cập nhật thất bại");
        }
      } catch (error) {
        console.error("Error updating profile:", error);
        throw error;
      }
    },
    async getUserProfile() {
      try {
        if (!this.token) throw new Error("Token không tồn tại");
        const decoded = jwtDecode(this.token);
        console.log("Decoded JWT:", decoded);
        const userId = decoded.id || decoded.userId || decoded._id;
        console.log("useridFromToken:", userId);

        const res = await getUserProfile(this.token); // Gọi service
        if (res) {
          this.UserProfile = res;
          return res;
        } else {
          throw new Error("Không lấy được danh sách hồ sơ");
        }
      } catch (err) {
        console.error("Error fetching user profile:", err);
        throw err;
      }
    },
    async getUserProfileDetailStore(profileID) {
      try {
        const decoded = jwtDecode(this.token);
        const userId = decoded.id || decoded.userId || decoded._id;
        // Gọi service, truyền userId và profileID (nếu backend cần userId)
        const response = await getUserProfileWithUserIDAndIDProfileService(
          userId,
          profileID
        );
        this.UserProfileDetail = response;
        return response;
      } catch (err) {
        console.error(
          "Error in getUserProfileWithUserIDAndIDProfileStore:",
          err
        );
        throw err;
      }
    },
    async deleteUserProfileByID(profileID) {
      try {
        const decoded = jwtDecode(this.token);
        const userId = decoded.id || decoded.userId || decoded._id;
        // Gọi service, truyền userId và profileID
        const response = await deleteUserprofileStore(userId, profileID);
        return response;
      } catch (err) {
        console.error("Error deleting user profile:", err);
        throw err;
      }
    },
    setBookingTickets(tickets) {
      this.bookingTickets = tickets;
    },

    async addNewAppointment({ profileID, doctorID, scheduleID }) {
      try {
        const res = await addNewAppointmentService(
          profileID,
          doctorID,
          scheduleID
        );
        this.appointment = res;
        return res;
      } catch (error) {
        throw error;
      }
    },
    async getListBookingTicket(apStatus) {
      try {
        const decoded = jwtDecode(this.token);
        const userId = decoded.id || decoded.userId || decoded._id;
        const res = await getListBookingTicketService(userId, apStatus);
        this.ListBookingTicket = res;
        return res;
      } catch (error) {
        throw error;
      }
    },
    async cancelAppointment(appointmentData) {
      try {
        const res = await cancelAppointmentService(appointmentData);
        console.log("Cancel appointment response:", res);
        return res;
      } catch (error) {
        console.error("Error canceling appointment:", error);
        throw error;
      }
    },
  },
});
