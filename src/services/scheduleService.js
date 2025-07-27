import axios from "axios";
const api_add_new_schedules = "http://localhost:3000/add-new-schedules";

async function addNewSchedules(scheduleData) {
  try {
    console.log("=== SCHEDULE SERVICE DEBUG ===");
    console.log("Service: Original data:", scheduleData);

    // Convert data to backend format
    const backendData = {
      doctorID: parseInt(scheduleData.doctorId), // Convert string to number
      dayOfWeek: getDayOfWeek(scheduleData.scheduleDate),
      dayOfMonth: scheduleData.scheduleDate,
      startTime: scheduleData.startTime,
      endTime: scheduleData.endTime,
      doctorPrice: 150000, // Default price
    };

    console.log("Service: Backend format data:", backendData);
    console.log("Service: Data type:", typeof backendData);
    console.log("Service: Data keys:", Object.keys(backendData));

    // Send data in the format the server expects
    const response = await axios.post(api_add_new_schedules, backendData);

    console.log("Service: Response received:", response.data);
    console.log("Service: Response type:", typeof response.data);
    console.log("=== END SCHEDULE SERVICE DEBUG ===");

    return response.data;
  } catch (error) {
    console.error("Service: Error details:", error.response?.data);
    console.error("Service: Error status:", error.response?.status);
    console.error("Service: Error message:", error.message);
    throw (
      error.response?.data?.message ||
      error.message ||
      "Lỗi khi thêm lịch làm việc"
    );
  }
}

// Helper function to get day of week
function getDayOfWeek(dateString) {
  const date = new Date(dateString);
  const days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  return days[date.getDay()];
}

export { addNewSchedules };
