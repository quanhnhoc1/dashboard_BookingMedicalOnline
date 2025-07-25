import axios from "axios";
const url_hospitals_private = "http://localhost:3000/get-hospitals-private";
const url_hospitals_public = "http://localhost:3000/get-hospitals-public";
const url_get_doctor =
  "http://localhost:3000/get-doctor-by-specialty-and-hospital/:specialtyID/:hospitalID";
// const url_speialty_by_hospital_id =
//   "http://localhost:3000/get-specialty-by-id/:hospitalID";
async function getHospitalsPrivate() {
  try {
    const response = await axios.get(url_hospitals_private);
    console.log("Private hospitals:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error getting private hospitals:",
      error.response?.data?.message
    );
    throw (
      error.response?.data?.message || "Không thể lấy thông tin bệnh viện tư"
    );
  }
}
async function getHospitalsPublic() {
  try {
    const response = await axios.get(url_hospitals_public);
    console.log("Public hospitals:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error getting public hospitals:",
      error.response?.data?.message
    );
    throw (
      error.response?.data?.message || "Không thể lấy thông tin bệnh viện công"
    );
  }
}

async function getSpecialtiesWithHospitalID(hospitalID) {
  try {
    const response = await axios.get(
      `http://localhost:3000/get-specialty-by-id/${hospitalID}`
    );
    console.log("Specialties for hospital ID:", hospitalID, response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error getting specialties for hospital ID:",
      error.response?.data?.message
    );
    throw (
      error.response?.data?.message ||
      "Không thể lấy thông tin chuyên khoa của bệnh viện"
    );
  }
}

async function getDoctorFromSpecialtyIDServicesAndIDHospital(
  specialtyID,
  hospitalID
) {
  try {
    const response = await axios.get(
      url_get_doctor
        .replace(":specialtyID", specialtyID)
        .replace(":hospitalID", hospitalID)
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching doctors:", error);
    throw error.response?.data?.message || "Không thể lấy thông tin bác sĩ";
  }
}

async function getHospitalById(hospitalID) {
  try {
    // Lấy tất cả bệnh viện công và tư
    const [publicHospitals, privateHospitals] = await Promise.all([
      axios.get(url_hospitals_public),
      axios.get(url_hospitals_private),
    ]);

    // Tìm bệnh viện theo ID
    const allHospitals = [...publicHospitals.data, ...privateHospitals.data];
    const hospital = allHospitals.find((h) => h.ID === hospitalID);

    return hospital || null;
  } catch (error) {
    console.error("Error fetching hospital by ID:", error);
    throw error.response?.data?.message || "Không thể lấy thông tin bệnh viện";
  }
}

export {
  getHospitalsPrivate,
  getHospitalsPublic,
  getSpecialtiesWithHospitalID,
  getDoctorFromSpecialtyIDServicesAndIDHospital,
  getHospitalById,
};
