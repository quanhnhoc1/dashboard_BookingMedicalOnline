import axios from "axios";
const url_get_schedule_by_doctor_id =
  "http://localhost:3000/get-schedule-by-doctor-id/:doctorID";

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
export { getScheduleDayServices, getScheduleMonthServices };
