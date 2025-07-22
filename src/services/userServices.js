import axios from "axios";
const url_add_appointment_by_user =
  "http://localhost:3000/add-appointment/:doctorID&:specialtyID";
const url_update_profile = "http://localhost:3000/update-profile";
const url_delete_user_profile_by_id =
  "http://localhost:3000/delete-profile-by-id";
const url_create_new_profile = "http://localhost:3000/add-new-user-profile";
async function addAppointmentByUserServices(doctorID, specialtyID, date) {
  try {
    const response = await axios.post(
      url_add_appointment_by_user
        .replace(":doctorID", doctorID)
        .replace(":specialtyID", specialtyID),
      date
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
    const token = localStorage.getItem("token");
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
async function getUserProfileDetailService(userID, profileID) {
  try {
    const token = localStorage.getItem("token"); // Lấy token từ localStorage
    const response = await axios.get(
      `http://localhost:3000/get-user-profile?profileID=${profileID}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("User profile fetch:", response.data);
    return response.data;
  } catch (err) {
    console.error("Error fetching user profile:", err.response?.data?.message);
    throw err.response?.data?.message || "Không thể lấy thông tin người dùng";
  }
}
async function deleteUserProfileByIDService(userID, profileID) {
  try {
    const token = localStorage.getItem("token"); // Lấy token từ localStorage
    const response = await axios.delete(
      `${url_delete_user_profile_by_id}?profileID=${profileID}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("User profile deleted:", response.data);
    return response.data;
  } catch (err) {
    console.error("Error deleting user profile:", err.response?.data?.message);
    throw err.response?.data?.message || "Không thể xóa hồ sơ người dùng";
  }
}
async function createNewProfile(data) {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(url_create_new_profile, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("New profile created:", response.data);
    return response.data;
  } catch (err) {
    console.error("Error creating new profile:", err.response?.data?.message);
    throw err.response?.data?.message || "Không thể tạo hồ sơ người dùng mới";
  }
}

async function addNewAppointmentService(profileID, doctorID, scheduleID) {
  try {
    const token = localStorage.getItem("token");
    const url = `http://localhost:3000/add-new-appointment?profileID=${profileID}&doctorID=${doctorID}&scheduleID=${scheduleID}`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
  } catch (err) {
    console.error("Error adding new appointment:", err.response?.data?.message);
    throw err.response?.data?.message;
  }
}

export {
  addAppointmentByUserServices,
  updateProfile,
  getUserProfileDetailService,
  deleteUserProfileByIDService,
  createNewProfile,
  addNewAppointmentService,
};
