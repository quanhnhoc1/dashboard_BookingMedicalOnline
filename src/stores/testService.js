// Test tính năng tìm kiếm từ store

import { deleteDoctorByID } from "../services/doctorServices.js";
import {
  getAllHospitals,
  getAllSpecialties,
} from "../services/hospitalService.js";
import { getDoctorsByHospitalIDService } from "../services/doctorServices.js";
import { addNewSchedules } from "../services/scheduleService.js";
(async () => {
  try {
    console.log("🧪 Testing search functionality from store...\n");
    const doctorPayLoad = {
      doctorID: 1148,
      dayOfWeek: "monday",
      dayOfMonth: "2025-07-28",
      doctorPrice: "150000",
      startTime: "18:00",
      endTime: "19:30",
    };
    // Test search từ store

    const results = await addNewSchedules(doctorPayLoad);
    console.log("✅ Search results:", results);
  } catch (err) {
    console.error("❌ Lỗi test:", err);
  }
})();
