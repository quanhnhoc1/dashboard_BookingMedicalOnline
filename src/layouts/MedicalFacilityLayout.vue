<!-- src/layouts/MedicalFacilityLayout.vue -->
<template>
  <div>
    <Header class="block">
      <template #iconHeadPhone>
        <SearchBar class="max-w-[220px]" />
      </template>
    </Header>
    <FindHospital class="pt-[100px]" />

    <div class="pt-[20px] border border-red-500 bg-[#e8f2f7]">
      <!-- Dùng router-view để hiển thị component con -->
      <router-view />
    </div>
  </div>
</template>

<script setup>
import Header from "@/components/composables/header.vue";
import SearchBar from "@/components/composables/SearchBar.vue";
import FindHospital from "@/components/FindHospital.vue";
</script>
