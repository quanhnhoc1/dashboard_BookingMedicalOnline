<!-- src/layouts/MedicalFacilityLayout.vue -->
<template>
  <div>
    <Header class="block">
      <template #iconHeadPhone>
        <SearchBar class="w-[240px] searchbar" />
      </template>
    </Header>
    <div class="pt-[100px] border border-red-500">
      <!-- Dùng router-view để hiển thị component con -->
      <router-view />
    </div>
  </div>
</template>

<script setup>
import Header from "@/components/header.vue";
import SearchBar from "@/components/SearchBar.vue";
</script>
