<template>
  <div
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
          placeholder="Tìm nhanh chuyên khoa"
          class="min-w-full px-4 py-2 text-sm focus:outline-none" />
        <div class="px-3 bg-gray-100 text-gray-500">
          <i class="fas fa-search"></i>
        </div>
      </div>
    </div>

    <!-- Danh sách chuyên khoa -->
    <div class="relative px-4 pb-4 text-sm h-80 overflow-y-auto w-full">
      <!-- Danh sách nếu có -->
      <div
        v-if="filteredSpecialties.length > 0"
        class="divide-y divide-gray-200">
        <RouterLink
          :to="`/dat-kham-benh/dat-kham-benh-theo-chuyen-khoa/chon-bac-si/${specialty.SpecialtyID}/${specialty.HospitalID}`"
          @click="selectSpecialty(specialty)"
          v-for="(specialty, index) in filteredSpecialties"
          :key="index"
          class="py-2 cursor-pointer hover:bg-gray-50 rounded-md px-2">
          <p class="font-bold text-gray-800 break-words">
            {{ specialty.SpecialtyName }}
          </p>
          <p class="italic text-gray-600 break-words">
            Lorem, ipsumDASDASDASDASDADS.
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

const hospitalsStore = userHospitalsStore();
const searchQuery = ref("");
const specialties = ref([]);

function selectSpecialty(specialty) {
  hospitalsStore.setSelectedSpecialty(specialty);
}
// Load dữ liệu từ API khi component mounted
const fetchSpecialties = async () => {
  try {
    if (hospitalsStore.selectedHospital?.ID) {
      const data = await hospitalsStore.getSpecialtiesWithHospitalID(
        hospitalsStore.selectedHospital.ID
      );
      specialties.value = data;
    }
  } catch (error) {
    console.error("Lỗi lấy chuyên khoa:", error);
  }
};

onMounted(fetchSpecialties);

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
  if (!searchQuery.value.trim()) return specialties.value;

  return specialties.value.filter((item) =>
    item.SpecialtyName.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
</script>
