<template>
  <div class="flex max-w-[1170px] mx-w-full m-auto gap-4 justify-center">
    <div>
      <div class="w-[70%] m-auto">
        <div class="space-y-4">
          <div
            v-for="hospital in hospitals"
            :key="hospital.ID"
            @click="selectHospital(hospital)"
            class="cursor-pointer flex items-start gap-4 p-4 bg-white rounded-xl shadow border border-blue-100 hover:shadow-md transition">
            <!-- Logo bệnh viện -->
            <img
              :src="hospital.IMG_SRC"
              alt="logos`"
              class="w-16 h-16 object-contain rounded-md border" />

            <!-- Nội dung chính -->
            <div class="flex-1">
              <div class="flex items-center gap-2">
                <h2 class="text-lg font-bold text-gray-800">
                  {{ hospital.NAME }}
                </h2>
                <span v-if="hospital.IS_VERIFIED" class="text-blue-500">
                  ✔️
                </span>
              </div>
              <div class="text-sm text-gray-500 flex items-center mt-1">
                📍 {{ hospital.ADDRESS }}
              </div>

              <!-- Đánh giá -->
              <div class="mt-1 text-yellow-500 flex items-center text-sm">
                ⭐ <span class="ml-1">{{ hospital.RATING || "4.5" }}</span>
                <span class="ml-2 text-gray-400">(100+ đánh giá)</span>
              </div>

              <!-- Nút hành động -->
              <div class="mt-3 flex gap-2">
                <button
                  class="border border-blue-500 text-blue-500 px-4 py-1 rounded-full hover:bg-blue-50 transition text-sm">
                  Xem chi tiết
                </button>
                <button
                  class="bg-cyan-500 text-white px-4 py-1 rounded-full hover:bg-cyan-600 transition text-sm">
                  Đặt khám ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="left-pane w-[30%]">
      <cardHospitalsPage :hospital="selectedHospital" />
    </div>
  </div>
</template>

<script setup>
import cardHospitalsPage from "@/components/cardHospitalsPage.vue";

import { ref, onMounted } from "vue";
import { useSearchStore } from "@/stores/searchStore";
import { userHospitalsStore } from "@/stores/getHospitalsStore";

const hospitalsStore = userHospitalsStore();
const hospitals = ref([]);
const searchStore = useSearchStore();

const selectedHospital = ref(null);

function selectHospital(hospital) {
  selectedHospital.value = hospital;
}

onMounted(() => {
  searchStore.setTitlePage("Bệnh viện công");
  hospitalsStore.getHospitalsPublic().then((data) => {
    hospitals.value = data.filter((hospital) => hospital.TYPE === "public");
  });
});
</script>
