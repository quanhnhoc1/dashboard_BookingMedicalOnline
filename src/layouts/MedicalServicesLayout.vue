<!-- src/layouts/MedicalFacilityLayout.vue -->
<template>
  <div>
    <Header class="block">
      <template #iconHeadPhone>
        <SearchBar class="max-w-[220px]" />
      </template>
    </Header>

    <div class="pt-[100px] border border-red-500">
      <!-- Dùng router-view để hiển thị component con -->
      <router-view />
    </div>
  </div>
</template>

<script setup>
import Header from "@/components/composables/header.vue";
import SearchBar from "@/components/composables/SearchBar.vue";
</script>
