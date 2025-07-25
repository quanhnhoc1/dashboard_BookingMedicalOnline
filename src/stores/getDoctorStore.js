import { defineStore } from "pinia";
import {
  getScheduleDayServices,
  getScheduleMonthServices,
  getScheduleIDByDateService,
  getScheduleWorkTimeByDoctorIDService,
  getAllDoctorService,
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
    doctorWorkTime: {},
    appointmentInfo: null,
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
    async getDoctorWorkTime(doctorId) {
      try {
        const response = await getScheduleWorkTimeByDoctorIDService(doctorId);
        this.doctorWorkTime[doctorId] = response; // Lưu thời gian làm việc của bác sĩ
        console.log("Doctor's work time:", response);
      } catch (err) {
        this.error = err.message || "Lỗi khi lấy thời gian làm việc của bác sĩ";
      }
    },
    async fetchDoctor() {
      try {
        const response = await getAllDoctorService();
        // Kiểm tra xem response có phải là array không
        this.doctors = Array.isArray(response)
          ? response
          : response?.data || [];
        console.log("Fetched doctors:", this.doctors);
      } catch (err) {
        console.error("Error fetching doctors:", err);
        this.error = err.message || "Lỗi khi lấy thông tin bác sĩ";
        this.doctors = []; // Set empty array on error
      }
    },
    setAppointmentInfo(info) {
      this.appointmentInfo = info;
      console.log("Appointment info set in store:", this.appointmentInfo);
    },
  },
});
