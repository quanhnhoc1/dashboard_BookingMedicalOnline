import axios from "axios";
const url_hospitals_private = "http://localhost:3000/get-hospitals-private";
const url_hospitals_public = "http://localhost:3000/get-hospitals-public";

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
export { getHospitalsPrivate, getHospitalsPublic };
