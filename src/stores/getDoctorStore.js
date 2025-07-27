import { defineStore } from "pinia";
import {
  getScheduleDayServices,
  getScheduleMonthServices,
  getScheduleIDByDateService,
  getScheduleWorkTimeByDoctorIDService,
  getAllDoctorService,
  deleteDoctorByID,
  addNewDoctor,
  getDoctorsByHospitalIDService,
} from "../services/doctorServices";

export const useDoctorStore = defineStore("doctor", {
  state: () => ({
    doctors: [
      // Test doctors for HOSP101
      {
        DOCTOR_PRO_ID: "1148",
        DOCTOR_NAME: "Dr. Nguyễn Văn A",
        specialty: "Tim mạch",
        experience: "15",
        hospitalId: "HOSP101",
      },
      {
        DOCTOR_PRO_ID: "1149",
        DOCTOR_NAME: "Dr. Trần Thị B",
        specialty: "Ngoại khoa",
        experience: "12",
        hospitalId: "HOSP101",
      },
      {
        DOCTOR_PRO_ID: "1150",
        DOCTOR_NAME: "Dr. Lê Văn C",
        specialty: "Nhi khoa",
        experience: "8",
        hospitalId: "HOSP101",
      },
      // Test doctors for HOSP102
      {
        DOCTOR_PRO_ID: "1151",
        DOCTOR_NAME: "Dr. Phạm Văn D",
        specialty: "Thần kinh",
        experience: "20",
        hospitalId: "HOSP102",
      },
      {
        DOCTOR_PRO_ID: "1152",
        DOCTOR_NAME: "Dr. Hoàng Thị E",
        specialty: "Da liễu",
        experience: "10",
        hospitalId: "HOSP102",
      },
    ],
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
    async deleteDoctor(doctorID) {
      this.loading = true;
      this.error = null;
      try {
        const response = await deleteDoctorByID(doctorID);
        console.log("Doctor deleted successfully:", response);

        // Xóa bác sĩ khỏi danh sách trong store
        this.doctors = this.doctors.filter(
          (doctor) => doctor.doctorID !== doctorID
        );

        console.log(
          "Updated doctors list:",
          this.doctors.length,
          "doctors remaining"
        );

        return response;
      } catch (err) {
        this.error = err.message || "Lỗi khi xóa bác sĩ";
        throw err;
      } finally {
        this.loading = false;
      }
    },
    async addNewDoctor(doctorPayLoad) {
      try {
        const response = await addNewDoctor(doctorPayLoad);
        console.log("Doctor added successfully:", response);
        // Refresh the doctors list after adding
        await this.fetchDoctor();
        return response;
      } catch (err) {
        this.error = err.message || "Lỗi khi thêm bác sĩ";
        throw err;
      }
    },
    async getDoctorsByHospitalID(hospitalID) {
      this.loading = true;
      this.error = null;

      try {
        console.log("=== STORE DOCTOR LOADING DEBUG ===");
        console.log("Store: Getting doctors for hospital ID:", hospitalID);
        console.log("Store: Hospital ID type:", typeof hospitalID);
        console.log("Store: Hospital ID length:", hospitalID?.length);

        // For testing, filter from local state
        const filteredDoctors = this.doctors.filter(
          (doctor) => doctor.hospitalId === hospitalID
        );

        console.log("Store: Filtered doctors:", filteredDoctors);
        console.log("Store: Filtered doctors count:", filteredDoctors.length);

        // In real app, this would be an API call
        // const response = await getDoctorsByHospitalIDService(hospitalID);
        // this.doctors = Array.isArray(response) ? response : response?.data || [];

        console.log("Store: Updated doctors array:", filteredDoctors);
        console.log("Store: Doctors count:", filteredDoctors.length);
        console.log("Store: Doctors array type:", typeof filteredDoctors);
        console.log("Store: Doctors is array:", Array.isArray(filteredDoctors));

        if (filteredDoctors.length > 0) {
          console.log("Store: First doctor in array:", filteredDoctors[0]);
          console.log(
            "Store: First doctor keys:",
            Object.keys(filteredDoctors[0])
          );
        }

        console.log("=== END STORE DOCTOR LOADING DEBUG ===");

        return filteredDoctors;
      } catch (err) {
        console.error("Store: Error getting doctors by hospital ID:", err);
        console.error("Store: Error message:", err.message);
        console.error("Store: Error stack:", err.stack);
        this.error = err.message || "Lỗi khi lấy danh sách bác sĩ";
        return [];
      } finally {
        this.loading = false;
      }
    },
  },
});
