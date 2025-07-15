import { defineStore } from "pinia";
import {
  getScheduleDayServices,
  getScheduleMonthServices,
} from "../services/doctorServices";

export const useDoctorStore = defineStore("doctor", {
  state: () => ({
    doctors: [],
    doctorSchedule: {},
    doctorScheduleMonths: {},
    loading: false,
    error: null,
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
  },
});
