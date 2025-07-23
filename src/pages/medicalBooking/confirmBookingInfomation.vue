<template>
  <div class="max-w-[1170px] mx-auto p-4">
    <breadcrumb class="bg-blue-50" />
    <div class="flex gap-6">
      <div class="w-1/3">
        <addressHospitals />
      </div>
      <div class="w-2/3">
        <bookingInformation />
      </div>
    </div>
  </div>
</template>

<script setup>
import breadcrumb from "@/components/breadcrumb.vue";
import addressHospitals from "@/components/BookingSpecialtiesComponents/addressHospitals.vue";
import bookingInformation from "@/components/BookingDoctorComponents/bookingInformation.vue";
</script>
