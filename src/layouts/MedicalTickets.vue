<!-- src/layouts/MedicalFacilityLayout.vue -->
<template>
  <div>
    <Header>
      <template #iconHeadPhone>
        <SearchBar class="max-w-[220px]" />
      </template>
    </Header>

    <div class="max-w-[1170px] m-auto pt-[120px] border">
      <!-- Dùng router-view để hiển thị component con -->
      <div class="flex">
        <Sidebar />
        <main class="flex-1 p-8">
          <router-view />

          <!-- <Tabs /> -->
          <!-- <div
            class="flex flex-col items-center justify-center text-center text-gray-400 mt-20">
            <img src="" alt="no-data" class="w-60 mb-4" />
            <p class="text-lg font-medium">Bạn chưa có phiếu khám nào</p>
          </div> -->
        </main>
      </div>
    </div>
    <PageFooter />
  </div>
</template>

<script setup>
import Header from "@/components/composables/header.vue";
import SearchBar from "@/components/composables/SearchBar.vue";
import Sidebar from "@/components/MedicalTicketsComponents/Sidebar.vue";
import PageFooter from "./PageFooter.vue";
</script>
