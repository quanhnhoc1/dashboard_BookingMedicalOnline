<template>
  <div class="max-w-[1170px] mx-auto p-4">
    <nav class="text-sm text-gray-600 mb-6 flex items-center space-x-2">
      <span class="text-bold text-gray-900 font-bold">Trang chủ</span>
      <span>&gt;</span>
      <span class="text-[#00b5f1] font-bold">{{ hospital.NAME }}</span>
      <span>&gt;</span>
      <span class="text-cyan-600 font-bold">Chọn chuyên khoa</span>
    </nav>
    <div class="flex gap-6">
      <!-- <bookingDatePicker /> -->
      <div class="w-1/3">
        <addressHospitals>
          <template #specialtyInfo>
            <div v-if="selectedSpecialty" class="flex items-start gap-3">
              <i
                class="fas fa-stethoscope text-gray-500 text-base mt-0.5 flex-shrink-0"></i>
              <div class="flex-1">
                <span class="text-gray-500 font-medium text-sm md:text-base"
                  >Chuyên khoa:</span
                >
                <span class="text-gray-700 text-sm md:text-base ml-2">
                  {{ selectedSpecialty.SpecialtyName }}
                </span>
              </div>
            </div>
          </template>
          <template #nameDoctor> <doctorNameBooking /> </template>
        </addressHospitals>
      </div>
      <div class="w-2/3">
        <router-view v-if="$route.name === 'bookingDateTime'" />
        <doctorRightPaneComponent v-else @book="handleBookDoctor" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, onMounted, ref } from "vue";
import { userHospitalsStore } from "@/stores/getHospitalsStore";
import { useRouter, useRoute } from "vue-router";
import doctorNameBooking from "@/components/doctorNameBooking.vue";
import { getHospitalById } from "@/services/hospitalService.js";
const router = useRouter();
const route = useRoute();
const hospitalsStore = userHospitalsStore();
const hospital = computed(() => hospitalsStore.selectedHospital);
import doctorRightPaneComponent from "@/components/BookingDoctorComponents/doctorRightPaneComponent.vue";
import addressHospitals from "@/components/BookingSpecialtiesComponents/addressHospitals.vue";

const selectedSpecialty = computed(() => hospitalsStore.selectedSpecialty);
const handleBookDoctor = (doctor) => {
  hospitalsStore.setSelectedDoctor(doctor);
  router.push({
    name: "bookingDateTime",
    params: {
      specialtyID: route.params.specialtyID,
      hospitalID: route.params.hospitalID,
      doctorID: doctor.DOCTOR_PRO_ID,
    },
  });
};

onMounted(async () => {
  // Kiểm tra nếu có hospital trong store và ID khớp với URL params
  if (hospital.value && hospital.value.ID === route.params.hospitalID) {
    hospitalsStore.getSpecialtiesWithHospitalID(hospital.value.ID);
  } else {
    // Nếu không có hospital hoặc ID không khớp, lấy thông tin từ URL params
    console.log(
      "Lấy thông tin bệnh viện từ URL params:",
      route.params.hospitalID
    );

    try {
      // Lấy thông tin bệnh viện từ API dựa trên hospitalID
      const hospitalData = await getHospitalById(route.params.hospitalID);
      if (hospitalData) {
        hospitalsStore.setHospital(hospitalData);
        hospitalsStore.getSpecialtiesWithHospitalID(hospitalData.ID);
      } else {
        console.error(
          "Không tìm thấy thông tin bệnh viện với ID:",
          route.params.hospitalID
        );
      }
    } catch (error) {
      console.error("Lỗi khi lấy thông tin bệnh viện:", error);
    }
  }
});
</script>
