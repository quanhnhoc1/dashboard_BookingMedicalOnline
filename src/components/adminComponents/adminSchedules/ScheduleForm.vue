<template>
  <div class="h-full flex flex-col overflow-hidden">
    <!-- Header Section -->
    <!-- <div
      class="px-2 md:px-4 py-2 md:py-3 border-b border-gray-200 flex-shrink-0 bg-gradient-to-r from-gray-50 to-white">
      <div class="mb-4">
        <h2 class="text-xl md:text-2xl font-bold text-gray-800 mb-2">
          Thêm Lịch Làm Việc
        </h2>
        <p class="text-gray-600 text-sm md:text-base">
          Chọn bác sĩ và thiết lập lịch làm việc
        </p>
      </div>
    </div> -->

    <!-- Scrollable Content Area -->
    <div class="flex-1 min-h-0 relative">
      <div class="h-full overflow-hidden">
        <div
          class="h-full overflow-y-auto overflow-x-auto custom-scrollbar p-4 md:p-6"
          style="height: calc(100vh - 200px)">
          <!-- Error and Success Messages -->
          <div
            v-if="scheduleStore.getError"
            class="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {{ scheduleStore.getError }}
          </div>

          <div
            v-if="scheduleStore.getSuccess"
            class="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            {{ scheduleStore.getSuccess }}
          </div>

          <!-- Form Content -->
          <div class="grid grid-cols-1 xl:grid-cols-3 gap-6 h-full">
            <!-- Form Section - Takes 2/3 of the width -->
            <div class="xl:col-span-2">
              <div
                class="bg-white p-6 md:p-8 rounded-lg shadow-md border border-gray-200 h-full">
                <h3
                  class="text-xl font-semibold text-gray-800 mb-8 flex items-center gap-2">
                  <i class="fas fa-calendar-plus text-blue-500"></i>
                  Thông Tin Lịch Làm Việc
                </h3>

                <!-- Hospital Selection Component -->
                <HospitalSelection
                  :selectedHospital="selectedHospital"
                  :hospitals="hospitals"
                  @update:selectedHospital="
                    (value) => {
                      selectedHospital = value;
                      onHospitalChange();
                    }
                  " />

                <!-- Doctor Selection Component -->
                <DoctorSelection
                  :selectedDoctor="selectedDoctor"
                  :doctors="doctors"
                  :loading="doctorStore.loading"
                  @update:selectedDoctor="
                    (value) => {
                      selectedDoctor = value;
                      onDoctorChange();
                    }
                  " />

                <!-- Schedule Form Fields Component -->
                <ScheduleFormFields
                  :scheduleDate="scheduleDate"
                  :startTime="startTime"
                  :endTime="endTime"
                  :hasLunchBreak="hasLunchBreak"
                  :lunchStart="lunchStart"
                  :lunchEnd="lunchEnd"
                  :notes="notes"
                  @update:scheduleDate="scheduleDate = $event"
                  @update:startTime="startTime = $event"
                  @update:endTime="endTime = $event"
                  @update:hasLunchBreak="hasLunchBreak = $event"
                  @update:lunchStart="lunchStart = $event"
                  @update:lunchEnd="lunchEnd = $event"
                  @update:notes="notes = $event" />

                <!-- Form Actions Component -->
                <ScheduleFormActions
                  :isFormValid="isFormValid"
                  @reset="resetForm"
                  @save="saveSchedule" />
              </div>
            </div>

            <!-- Current Schedules Section - Takes 1/3 of the width -->
            <div class="xl:col-span-1">
              <CurrentSchedules
                :schedules="currentSchedules"
                :onDelete="deleteSchedule" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { userHospitalsStore } from "../../../stores/getHospitalsStore.js";
import { useDoctorStore } from "../../../stores/getDoctorStore.js";
import { useScheduleStore } from "../../../stores/scheduleStore.js";
import DoctorSelection from "./DoctorSelection.vue";
import HospitalSelection from "./HospitalSelection.vue";
import ScheduleFormFields from "./ScheduleFormFields.vue";
import CurrentSchedules from "./CurrentSchedules.vue";
import ScheduleFormActions from "./ScheduleFormActions.vue";

// Stores
const hospitalsStore = userHospitalsStore();
const doctorStore = useDoctorStore();
const scheduleStore = useScheduleStore();

// Reactive data
const selectedHospital = ref("HOSP101"); // Test with HOSP101
const selectedDoctor = ref("1148"); // Test with numeric doctor ID
const scheduleDate = ref("2024-01-15"); // Monday
const startTime = ref("08:00");
const endTime = ref("17:00");
const hasLunchBreak = ref(true);
const lunchStart = ref("12:00");
const lunchEnd = ref("13:00");
const notes = ref("Test schedule");

const hospitals = ref([]);
const doctors = ref([]);
const currentSchedules = ref([]);

// Watcher for selectedHospital changes
watch(selectedHospital, (newValue, oldValue) => {
  console.log("=== WATCHER DEBUG ===");
  console.log(
    "Watcher: selectedHospital changed from:",
    oldValue,
    "to:",
    newValue
  );
  console.log("Watcher: newValue type:", typeof newValue);
  console.log("Watcher: newValue length:", newValue?.length);
  console.log("=== END WATCHER DEBUG ===");
});

// Computed
const isFormValid = computed(() => {
  return (
    selectedHospital.value &&
    selectedDoctor.value &&
    scheduleDate.value &&
    startTime.value &&
    endTime.value &&
    startTime.value < endTime.value &&
    (!hasLunchBreak.value ||
      (lunchStart.value && lunchEnd.value && lunchStart.value < lunchEnd.value))
  );
});

// Methods
const loadHospitals = async () => {
  try {
    console.log("=== HOSPITAL LOADING DEBUG ===");
    console.log("Component: Loading hospitals...");

    const hospitalsData = await hospitalsStore.getAllHospitals();

    console.log("Component: Hospitals data from store:", hospitalsData);
    console.log("Component: Hospitals count:", hospitalsData?.length);

    hospitals.value = hospitalsData;

    console.log("Component: Final hospitals array:", hospitals.value);
    console.log("Component: Hospitals count:", hospitals.value.length);

    if (hospitals.value.length > 0) {
      console.log("Component: First hospital:", hospitals.value[0]);
      console.log(
        "Component: First hospital keys:",
        Object.keys(hospitals.value[0])
      );
    }

    console.log("=== END HOSPITAL LOADING DEBUG ===");
  } catch (error) {
    console.error("Component: Error loading hospitals:", error);
    console.error("Component: Error details:", error.message);
  }
};

const onHospitalChange = () => {
  console.log("=== HOSPITAL CHANGE DEBUG ===");
  console.log("Component: Hospital changed to:", selectedHospital.value);
  console.log("Component: Hospital value type:", typeof selectedHospital.value);
  console.log(
    "Component: Hospital value length:",
    selectedHospital.value?.length
  );

  // Reset doctor selection when hospital changes
  selectedDoctor.value = "";
  currentSchedules.value = [];

  // Load doctors if hospital is selected
  if (selectedHospital.value && selectedHospital.value !== "") {
    console.log(
      "Component: Loading doctors for hospital:",
      selectedHospital.value
    );
    loadDoctorsForHospital();
  } else {
    console.log("Component: No hospital selected, clearing doctors");
    doctors.value = [];
  }
  console.log("=== END HOSPITAL CHANGE DEBUG ===");
};

const loadDoctorsForHospital = async () => {
  console.log("=== LOAD DOCTORS DEBUG ===");
  console.log("Component: Hospital value:", selectedHospital.value);
  console.log("Component: Hospital type:", typeof selectedHospital.value);

  if (!selectedHospital.value) {
    console.log("Component: No hospital selected, clearing doctors");
    doctors.value = [];
    return;
  }

  try {
    console.log(
      "Component: Calling store.getDoctorsByHospitalID with:",
      selectedHospital.value
    );

    // Load doctors from store using hospital ID (as string)
    const doctorsData = await doctorStore.getDoctorsByHospitalID(
      selectedHospital.value
    );

    console.log("Component: Store doctors after call:", doctorStore.doctors);
    console.log("Component: Store error after call:", doctorStore.error);
    console.log("Component: Store loading after call:", doctorStore.loading);
    console.log("Component: Returned doctors data:", doctorsData);

    // Use the returned data or fallback to store state
    doctors.value = doctorsData || doctorStore.doctors || [];

    console.log("Component: Final doctors array:", doctors.value);
    console.log("Component: Doctors count:", doctors.value.length);

    // Log first doctor structure if exists
    if (doctors.value.length > 0) {
      console.log("Component: First doctor structure:", doctors.value[0]);
      console.log(
        "Component: First doctor keys:",
        Object.keys(doctors.value[0])
      );
    } else {
      console.log(
        "Component: No doctors found for hospital:",
        selectedHospital.value
      );
    }
    console.log("=== END LOAD DOCTORS DEBUG ===");
  } catch (error) {
    console.error("Component: Error loading doctors for hospital:", error);
    doctors.value = [];
  }
};

const onDoctorChange = () => {
  console.log("=== DOCTOR CHANGE DEBUG ===");
  console.log("Component: Doctor changed to:", selectedDoctor.value);
  console.log("Component: Doctor type:", typeof selectedDoctor.value);
  console.log("Component: Doctor length:", selectedDoctor.value?.length);

  loadCurrentSchedules();

  console.log("=== END DOCTOR CHANGE DEBUG ===");
};

// Load current schedules
const loadCurrentSchedules = async () => {
  try {
    console.log("=== LOAD CURRENT SCHEDULES DEBUG ===");
    console.log(
      "Component: Loading current schedules for doctor:",
      selectedDoctor.value
    );

    if (!selectedDoctor.value) {
      currentSchedules.value = [];
      console.log("Component: No doctor selected, clearing schedules");
      return;
    }

    // Get schedules from store
    const schedules = scheduleStore.getSchedulesByDoctor(selectedDoctor.value);
    currentSchedules.value = schedules;

    console.log("Component: Loaded schedules:", schedules);
    console.log("Component: Schedules count:", schedules.length);
    console.log("=== END LOAD CURRENT SCHEDULES DEBUG ===");
  } catch (error) {
    console.error("Component: Error loading current schedules:", error);
    currentSchedules.value = [];
  }
};

// Save schedule
const saveSchedule = async () => {
  try {
    console.log("=== SAVE SCHEDULE DEBUG ===");
    console.log("Component: Form data:", {
      hospitalId: selectedHospital.value,
      doctorId: selectedDoctor.value,
      scheduleDate: scheduleDate.value,
      startTime: startTime.value,
      endTime: endTime.value,
      hasLunchBreak: hasLunchBreak.value,
      lunchStart: lunchStart.value,
      lunchEnd: lunchEnd.value,
      notes: notes.value,
    });

    // Validate required fields with detailed logging
    const validationErrors = [];

    if (!selectedHospital.value) {
      validationErrors.push("Bệnh viện");
    }
    if (!selectedDoctor.value) {
      validationErrors.push("Bác sĩ");
    }
    if (!scheduleDate.value) {
      validationErrors.push("Ngày làm việc");
    }
    if (!startTime.value) {
      validationErrors.push("Thời gian bắt đầu");
    }
    if (!endTime.value) {
      validationErrors.push("Thời gian kết thúc");
    }

    if (validationErrors.length > 0) {
      const errorMessage = `Vui lòng điền đầy đủ thông tin bắt buộc: ${validationErrors.join(
        ", "
      )}`;
      console.log("Component: Validation failed:", errorMessage);
      throw new Error(errorMessage);
    }

    // Validate time
    if (startTime.value >= endTime.value) {
      throw new Error("Thời gian kết thúc phải sau thời gian bắt đầu");
    }

    // Validate lunch break if enabled
    if (hasLunchBreak.value) {
      if (!lunchStart.value || !lunchEnd.value) {
        throw new Error("Vui lòng điền thời gian nghỉ trưa");
      }
      if (lunchStart.value >= lunchEnd.value) {
        throw new Error(
          "Thời gian kết thúc nghỉ trưa phải sau thời gian bắt đầu"
        );
      }
      if (
        lunchStart.value <= startTime.value ||
        lunchEnd.value >= endTime.value
      ) {
        throw new Error(
          "Thời gian nghỉ trưa phải nằm trong khoảng thời gian làm việc"
        );
      }
    }

    // Prepare schedule data
    const scheduleData = {
      hospitalId: selectedHospital.value,
      doctorId: selectedDoctor.value,
      scheduleDate: scheduleDate.value,
      startTime: startTime.value,
      endTime: endTime.value,
      hasLunchBreak: hasLunchBreak.value,
      lunchStart: hasLunchBreak.value ? lunchStart.value : null,
      lunchEnd: hasLunchBreak.value ? lunchEnd.value : null,
      notes: notes.value,
    };

    console.log("Component: Schedule data prepared:", scheduleData);

    // Save to store
    const response = await scheduleStore.addNewSchedule(scheduleData);

    console.log("Component: Schedule saved successfully:", response);

    // Reset form
    resetForm();

    // Refresh current schedules
    await loadCurrentSchedules();

    console.log("=== END SAVE SCHEDULE DEBUG ===");
  } catch (error) {
    console.error("Component: Error saving schedule:", error);
    // Error is already handled in the store
  }
};

const deleteSchedule = async (scheduleId) => {
  try {
    console.log("=== DELETE SCHEDULE DEBUG ===");
    console.log("Component: Deleting schedule with ID:", scheduleId);

    // Delete from store
    await scheduleStore.deleteSchedule(scheduleId);

    console.log("Component: Schedule deleted successfully");

    // Refresh current schedules
    await loadCurrentSchedules();

    console.log("=== END DELETE SCHEDULE DEBUG ===");
  } catch (error) {
    console.error("Component: Error deleting schedule:", error);
    // Error is already handled in the store
  }
};

const resetForm = () => {
  selectedHospital.value = "";
  selectedDoctor.value = "";
  scheduleDate.value = "";
  startTime.value = "";
  endTime.value = "";
  hasLunchBreak.value = false;
  lunchStart.value = "";
  lunchEnd.value = "";
  notes.value = "";
  currentSchedules.value = [];
  doctors.value = [];
};

// Lifecycle
onMounted(() => {
  loadHospitals();
});
</script>

<style scoped>
/* Custom Scrollbar Styles */
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #cbd5e0 #f7fafc;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f7fafc;
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #cbd5e0, #a0aec0);
  border-radius: 4px;
  transition: background 0.3s ease;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #a0aec0, #718096);
}

.custom-scrollbar::-webkit-scrollbar-corner {
  background: #f7fafc;
}

/* Smooth scrolling for the entire page */
html {
  scroll-behavior: smooth;
}

/* Enhanced card animations */
.group:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
}
</style>
