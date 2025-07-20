import { defineStore } from "pinia";
import {
  getScheduleDayServices,
  getScheduleMonthServices,
  getScheduleIDByDateService,
} from "../services/doctorServices";

export const useDoctorStore = defineStore("doctor", {
  state: () => ({
    doctors: [],
    doctorSchedule: {},
    doctorScheduleMonths: {},
    loading: false,
    error: null,
    scheduleID: {},
    selectedDate: null,
  }),
  actions: {
    async fetchDoctorSchedule(doctorId) {
      this.loading = true;
      this.error = null;
      try {
        const data = await getScheduleDayServices(doctorId);
        this.doctorSchedule[doctorId] = data;
      } catch (err) {
        this.error = err.message || "Lỗi khi tải lịch bác sĩ";
      } finally {
        this.loading = false;
      }
    },
    async getDoctorDateOfMonth(doctorId) {
      this.loading = true;
      this.error = null;
      try {
        const data = await getScheduleMonthServices(doctorId);
        this.doctorScheduleMonths[doctorId] = data;
      } catch (err) {
        this.error = err.message || "Lỗi khi tải lịch bác sĩ";
      } finally {
        this.loading = false;
      }
    },
    async getScheduleIDByDate(date) {
      try {
        const data = await getScheduleIDByDateService(date);
        this.scheduleID[date] = data; // Lưu ID lịch theo ngày
        this.selectedDate = date; // Lưu ngày đã chọn
        console.log("Schedule ID for date:", date, "is", data);
      } catch (err) {
        this.error = err.message || "Lỗi khi lấy ID lịch theo ngày";
      }
    },
    // async getScheduleID(doctorId) {
    //   this.loading = true;
    //   this.error = null;
    //   try {
    //     const data = await getScheduleDayServices(doctorId);
    //     this.scheduleID[doctorId] = data;
    //   } catch (err) {
    //     this.error = err.message || "Lỗi khi tải lịch bác sĩ";
    //   } finally {
    //     this.loading = false;
    //   }
    // },
  },
});
