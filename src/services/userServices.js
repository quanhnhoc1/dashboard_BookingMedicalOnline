import axios from "axios";
const url_add_appointment_by_user =
  "http://localhost:3000/add-appointment/:doctorID&:specialtyID";
const url_update_profile = "http://localhost:3000/update-profile";

async function addAppointmentByUserServices(doctorID, specialtyID, data) {
  try {
    const response = await axios.post(
      url_add_appointment_by_user
        .replace(":doctorID", doctorID)
        .replace(":specialtyID", specialtyID),
      data
    );
    console.log("Appointment added:", response.data);
    return response.data;
  } catch (err) {
    console.error("Error adding appointment:", err.response?.data?.message);
    throw err.response?.data?.message || "Không thể đặt lịch hẹn với bác sĩ";
  }
}

async function updateProfile(data) {
  try {
    // Lấy token từ localStorage hoặc store
    const token = localStorage.getItem("token"); // hoặc từ Pinia/Vuex nếu bạn lưu ở đó
    const response = await axios.put(url_update_profile, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Profile updated:", response.data);
    return response.data;
  } catch (err) {
    console.error("Error updating profile:", err.response?.data?.message);
    throw err.response?.data?.message || "Không thể cập nhật thông tin cá nhân";
  }
}

export { addAppointmentByUserServices, updateProfile };
