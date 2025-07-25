<template>
  <div
    :key="`specialties-${currentHospitalID}`"
    class="w-full max-w-xl mx-auto rounded-2xl shadow-lg bg-white overflow-hidden">
    <!-- Header -->
    <div class="bg-cyan-500 text-white text-center py-3 text-lg font-semibold">
      Vui lòng chọn chuyên khoaaaaa
    </div>

    <!-- Search Box -->
    <div class="p-4">
      <div
        class="w-full min-w-[2000px] flex items-center border rounded-md overflow-hidden">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Tìm nhanh chuyên khoa..."
          class="flex-1 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500" />
        <div
          class="px-4 py-3 bg-gray-50 text-gray-500 border-l border-gray-300">
          <i class="fas fa-search"></i>
        </div>
      </div>
    </div>

    <!-- Danh sách chuyên khoa -->
    <div class="relative px-4 pb-4 text-sm h-80 overflow-y-auto w-full">
      <!-- Danh sách nếu có -->
      <div
        v-if="filteredSpecialties.length > 0"
        class="divide-y divide-gray-200 bg-white rounded-lg shadow-sm overflow-hidden">
        <RouterLink
          v-for="(specialty, index) in filteredSpecialties"
          :key="`${specialty.SpecialtyID}-${specialty.HospitalID}-${index}`"
          :to="`/dat-kham-benh/dat-kham-benh-theo-chuyen-khoa/chon-bac-si/${specialty.SpecialtyID}/${specialty.HospitalID}`"
          @click="selectSpecialty(specialty)"
          class="block py-3 px-4 hover:bg-gray-50 transition-all duration-200">
          <p class="font-bold text-gray-800 break-words">
            {{ specialty.SpecialtyName }}
          </p>
          <p class="italic text-gray-600 text-sm break-words">
            ID: {{ specialty.SpecialtyID }} - Hospital:
            {{ specialty.HospitalID }}
          </p>
        </RouterLink>
      </div>

      <!-- Hiển thị thông báo khi không có kết quả -->
      <div
        v-else
        class="absolute inset-0 flex items-center justify-center text-gray-500 italic text-center">
        Không tìm thấy chuyên khoa phù hợp.
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { userHospitalsStore } from "@/stores/getHospitalsStore";
import { useRoute } from "vue-router";
import { getHospitalById } from "@/services/hospitalService.js";

const hospitalsStore = userHospitalsStore();
const route = useRoute();
const searchQuery = ref("");
const specialties = ref([]);

// Computed để theo dõi hospital ID hiện tại
const currentHospitalID = computed(() => hospitalsStore.selectedHospital?.ID);

function selectSpecialty(specialty) {
  console.log("Selected specialty:", specialty);
  console.log("SpecialtyID:", specialty.SpecialtyID);
  console.log("HospitalID:", specialty.HospitalID);
  hospitalsStore.setSelectedSpecialty(specialty);
}
// Load dữ liệu từ API khi component mounted
const fetchSpecialties = async () => {
  try {
    let hospitalID = hospitalsStore.selectedHospital?.ID;

    // Nếu không có hospital trong store, thử lấy từ URL params
    if (!hospitalID && route.params.hospitalID) {
      console.log(
        "Lấy thông tin bệnh viện từ URL params:",
        route.params.hospitalID
      );
      const hospitalData = await getHospitalById(route.params.hospitalID);
      if (hospitalData) {
        hospitalsStore.setHospital(hospitalData);
        hospitalID = hospitalData.ID;
      }
    }

    if (hospitalID) {
      console.log("Fetching specialties for hospital ID:", hospitalID);
      // Clear specialties cũ trước khi lấy mới
      specialties.value = [];
      const data = await hospitalsStore.getSpecialtiesWithHospitalID(
        hospitalID
      );
      specialties.value = data;
      console.log("Loaded specialties:", data);
      // Log chi tiết từng specialty để debug
      data.forEach((specialty, index) => {
        console.log(`Specialty ${index}:`, {
          SpecialtyID: specialty.SpecialtyID,
          SpecialtyName: specialty.SpecialtyName,
          HospitalID: specialty.HospitalID,
          HospitalName: specialty.HospitalName,
        });
      });
    } else {
      console.warn("Không có hospital ID để lấy chuyên khoa!");
      specialties.value = [];
    }
  } catch (error) {
    console.error("Lỗi lấy chuyên khoa:", error);
    specialties.value = [];
  }
};

onMounted(fetchSpecialties);

// Watcher để theo dõi thay đổi của selectedHospital
watch(
  () => hospitalsStore.selectedHospital,
  (newHospital, oldHospital) => {
    if (newHospital && newHospital.ID) {
      console.log(
        "Hospital changed, fetching new specialties for:",
        newHospital.ID
      );
      // Clear specialties cũ trong store
      hospitalsStore.clearSpecialties();
      // Clear specialties trong component
      specialties.value = [];
      // Force delay để đảm bảo clear hoàn tất
      setTimeout(() => {
        fetchSpecialties();
      }, 100);
    }
  },
  { immediate: false }
);

// computed để lọc theo searchQuery
// const filteredSpecialties = computed(() => {
//   if (!searchQuery.value.trim()) return specialties.value;
//   return specialties.value.filter(
//     (item) =>
//       item.NAME.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
//       item.SYMPTOMS?.toLowerCase().includes(searchQuery.value.toLowerCase())
//   );
// });

const filteredSpecialties = computed(() => {
  console.log(
    "Computing filtered specialties, current specialties:",
    specialties.value
  );
  console.log("Current hospital ID:", currentHospitalID.value);
  if (!searchQuery.value.trim()) return specialties.value;

  return specialties.value.filter((item) =>
    item.SpecialtyName.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
</script>
