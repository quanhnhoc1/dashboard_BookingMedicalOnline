import { defineStore } from "pinia";
import { addNewSchedules } from "../services/scheduleService.js";

export const useScheduleStore = defineStore("schedule", {
  state: () => ({
    schedules: [
      // Sample schedules for testing
      {
        id: 1,
        hospitalId: "HOSP101",
        doctorId: "DOC001",
        scheduleDate: "2024-01-15",
        startTime: "08:00",
        endTime: "17:00",
        hasLunchBreak: true,
        lunchStart: "12:00",
        lunchEnd: "13:00",
        notes: "Khám bệnh tim mạch",
        createdAt: "2024-01-10T10:00:00.000Z",
      },
      {
        id: 2,
        hospitalId: "HOSP101",
        doctorId: "DOC001",
        scheduleDate: "2024-01-16",
        startTime: "09:00",
        endTime: "18:00",
        hasLunchBreak: false,
        lunchStart: null,
        lunchEnd: null,
        notes: "Khám bệnh ngoại trú",
        createdAt: "2024-01-10T11:00:00.000Z",
      },
    ],
    currentSchedule: null,
    loading: false,
    error: null,
    success: null,
  }),

  getters: {
    // Get all schedules
    getAllSchedules: (state) => state.schedules,

    // Get schedules by doctor ID
    getSchedulesByDoctor: (state) => (doctorId) => {
      return state.schedules.filter(
        (schedule) => schedule.doctorId === doctorId
      );
    },

    // Get schedules by hospital ID
    getSchedulesByHospital: (state) => (hospitalId) => {
      return state.schedules.filter(
        (schedule) => schedule.hospitalId === hospitalId
      );
    },

    // Get schedules by date
    getSchedulesByDate: (state) => (date) => {
      return state.schedules.filter(
        (schedule) => schedule.scheduleDate === date
      );
    },

    // Check if loading
    isLoading: (state) => state.loading,

    // Get error message
    getError: (state) => state.error,

    // Get success message
    getSuccess: (state) => state.success,
  },

  actions: {
    // Add new schedule
    async addNewSchedule(scheduleData) {
      this.loading = true;
      this.error = null;
      this.success = null;

      try {
        console.log("=== SCHEDULE STORE DEBUG ===");
        console.log("Store: Adding new schedule with data:", scheduleData);

        // Basic validation
        if (
          !scheduleData.hospitalId ||
          !scheduleData.doctorId ||
          !scheduleData.scheduleDate ||
          !scheduleData.startTime ||
          !scheduleData.endTime
        ) {
          throw new Error("Vui lòng điền đầy đủ thông tin bắt buộc");
        }

        // Validate time format (HH:MM)
        const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
        if (
          !timeRegex.test(scheduleData.startTime) ||
          !timeRegex.test(scheduleData.endTime)
        ) {
          throw new Error(
            "Thời gian phải có định dạng HH:MM (ví dụ: 08:30, 14:45)"
          );
        }

        // Basic time validation
        if (scheduleData.startTime >= scheduleData.endTime) {
          throw new Error("Thời gian kết thúc phải sau thời gian bắt đầu");
        }

        // Clean up data for API
        const cleanData = {
          hospitalId: scheduleData.hospitalId,
          doctorId: scheduleData.doctorId,
          scheduleDate: scheduleData.scheduleDate,
          startTime: scheduleData.startTime,
          endTime: scheduleData.endTime,
          hasLunchBreak: scheduleData.hasLunchBreak || false,
          lunchStart: scheduleData.hasLunchBreak
            ? scheduleData.lunchStart
            : null,
          lunchEnd: scheduleData.hasLunchBreak ? scheduleData.lunchEnd : null,
          notes: scheduleData.notes || "",
        };

        console.log("Store: Clean data for API:", cleanData);
        console.log(
          "Store: Start time format:",
          cleanData.startTime,
          "Type:",
          typeof cleanData.startTime
        );
        console.log(
          "Store: End time format:",
          cleanData.endTime,
          "Type:",
          typeof cleanData.endTime
        );
        console.log(
          "Store: Date format:",
          cleanData.scheduleDate,
          "Type:",
          typeof cleanData.scheduleDate
        );

        const response = await addNewSchedules(cleanData);

        console.log("Store: API response:", response);
        console.log("Store: Response type:", typeof response);

        if (response && response.success) {
          // Add the new schedule to the local state
          const newSchedule = {
            id: response.scheduleId || Date.now(),
            ...cleanData,
            createdAt: new Date().toISOString(),
          };

          this.schedules.push(newSchedule);
          this.success = "Lịch làm việc đã được thêm thành công!";

          console.log("Store: Schedule added successfully:", newSchedule);
          console.log("Store: Total schedules:", this.schedules.length);
        } else {
          throw new Error(response?.message || "Không thể thêm lịch làm việc");
        }

        console.log("=== END SCHEDULE STORE DEBUG ===");
        return response;
      } catch (error) {
        console.error("Store: Error adding schedule:", error);
        this.error = error.message || "Lỗi khi thêm lịch làm việc";
        throw error;
      } finally {
        this.loading = false;
      }
    },

    // Update schedule
    async updateSchedule(scheduleId, updatedData) {
      this.loading = true;
      this.error = null;
      this.success = null;

      try {
        const scheduleIndex = this.schedules.findIndex(
          (s) => s.id === scheduleId
        );
        if (scheduleIndex !== -1) {
          this.schedules[scheduleIndex] = {
            ...this.schedules[scheduleIndex],
            ...updatedData,
            updatedAt: new Date().toISOString(),
          };
          this.success = "Lịch làm việc đã được cập nhật thành công!";
        } else {
          throw new Error("Không tìm thấy lịch làm việc");
        }
      } catch (error) {
        console.error("Store: Error updating schedule:", error);
        this.error = error.message || "Lỗi khi cập nhật lịch làm việc";
        throw error;
      } finally {
        this.loading = false;
      }
    },

    // Delete schedule
    async deleteSchedule(scheduleId) {
      this.loading = true;
      this.error = null;
      this.success = null;

      try {
        const scheduleIndex = this.schedules.findIndex(
          (s) => s.id === scheduleId
        );
        if (scheduleIndex !== -1) {
          this.schedules.splice(scheduleIndex, 1);
          this.success = "Lịch làm việc đã được xóa thành công!";
        } else {
          throw new Error("Không tìm thấy lịch làm việc");
        }
      } catch (error) {
        console.error("Store: Error deleting schedule:", error);
        this.error = error.message || "Lỗi khi xóa lịch làm việc";
        throw error;
      } finally {
        this.loading = false;
      }
    },

    // Load schedules (for future use when API is available)
    async loadSchedules(filters = {}) {
      this.loading = true;
      this.error = null;

      try {
        // TODO: Implement when API is available
        // const response = await getSchedulesService(filters);
        // this.schedules = response.data || [];

        console.log("Store: Loading schedules with filters:", filters);
        // For now, return empty array
        return [];
      } catch (error) {
        console.error("Store: Error loading schedules:", error);
        this.error = error.message || "Lỗi khi tải danh sách lịch làm việc";
        throw error;
      } finally {
        this.loading = false;
      }
    },

    // Clear error and success messages
    clearMessages() {
      this.error = null;
      this.success = null;
    },

    // Set current schedule
    setCurrentSchedule(schedule) {
      this.currentSchedule = schedule;
    },

    // Clear current schedule
    clearCurrentSchedule() {
      this.currentSchedule = null;
    },
  },
});
