import axios from "axios";
const url_get_schedule_by_doctor_id =
  "http://localhost:3000/get-schedule-by-doctor-id/:doctorID";
const url_get_schedule_by_doctor_date = "http://localhost:3000/schedule-id";
async function getScheduleDayServices(doctorID) {
  try {
    const response = await axios.get(
      url_get_schedule_by_doctor_id.replace(":doctorID", doctorID)
    );
    console.log("Doctor's schedule:" + doctorID, response.data);
    return response.data.days;
  } catch (err) {
    console.error(
      "Error fetching doctor's schedule:",
      err.response?.data?.message
    );
    throw (
      err.response?.data?.message || "Không thể lấy lịch làm việc của bác sĩ"
    );
  }
}

async function getScheduleMonthServices(doctorID) {
  try {
    const response = await axios.get(
      url_get_schedule_by_doctor_id.replace(":doctorID", doctorID)
    );
    console.log("Doctor's schedule123123:" + doctorID, response.data.months);
    return response.data.months;
  } catch (err) {
    console.error(
      "Error fetching doctor's schedule:",
      err.response?.data?.message
    );
    throw (
      err.response?.data?.message || "Không thể lấy lịch làm việc của bác sĩ"
    );
  }
}
async function getScheduleScheduleIDServices(doctorID) {
  try {
    const response = await axios.get(
      url_get_schedule_by_doctor_id.replace(":doctorID", doctorID)
    );
    console.log("Doctor's scheduleID:" + doctorID, response.data.scheduleID);
    return response.data.scheduleID;
  } catch (err) {
    console.error(
      "Error fetching doctor's schedule:",
      err.response?.data?.message
    );
    throw (
      err.response?.data?.message || "Không thể lấy lịch làm việc của bác sĩ"
    );
  }
}
async function getScheduleIDByDateService(date) {
  try {
    const response = await axios.post(url_get_schedule_by_doctor_date, {
      date,
    });
    console.log("Schedule ID by date:", response.data);
    return response.data.ID ?? response.data.id ?? null; // Trả về ID lịch nếu có, hoặc null nếu không có
  } catch (err) {
    console.error(
      "Error fetching schedule ID by date:",
      err.response?.data?.message
    );
    throw err.response?.data?.message || "Không thể lấy ID lịch theo ngày";
  }
}
async function getScheduleWorkTimeByDoctorIDService(doctorID) {
  try {
    const response = await axios.get(
      `http://localhost:3000/get-word-time-doctor/${doctorID}`
    );
    console.log("Doctor's work time:", response.data);
    return response.data;
  } catch (err) {
    console.error(
      "Error fetching doctor's work time:",
      err.response?.data?.message
    );
    throw (
      err.response?.data?.message ||
      "Không thể lấy thời gian làm việc của bác sĩ"
    );
  }
}

async function getAllDoctorService() {
  try {
    const response = await axios.get("http://localhost:3000/get-all-doctors");
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.error("Error fetching all doctors:", err.response?.data?.message);
    throw err.response?.data?.message || "Không thể lấy danh sách bác sĩ";
  }
}
async function deleteDoctorByID(doctorID) {
  try {
    const response = await axios.get(
      `http://localhost:3000/delete-doctor-by-id/${doctorID}`
    );
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.error("Error deleting doctor:", err.response?.data?.message);
  }
}

async function updateDoctorProfile(doctorID, doctorData) {
  try {
    const response = await axios.put(
      `http://localhost:3000/update-doctor-profile/${doctorID}`,
      doctorData
    );
    console.log("Doctor updated successfully:", response.data);
    return response.data;
  } catch (err) {
    console.error("Error updating doctor:", err.response?.data?.message);
    throw err.response?.data?.message || "Không thể cập nhật thông tin bác sĩ";
  }
}

export {
  getScheduleDayServices,
  getScheduleMonthServices,
  getScheduleIDByDateService,
  getScheduleScheduleIDServices,
  getScheduleWorkTimeByDoctorIDService,
  getAllDoctorService,
  deleteDoctorByID,
  updateDoctorProfile,
};
