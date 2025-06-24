<template>
  <section
    class="bg-gradient-to-br from-blue-500 to-purple-600 text-white py-16 px-5 text-center">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-4xl font-bold mb-4">Chăm sóc sức khỏe của bạn</h1>
      <p class="text-xl mb-8 opacity-90">
        Đặt lịch khám bệnh trực tuyến nhanh chóng và tiện lợi
      </p>
      <div class="mb-8 text-black">
        <searchbar>
          <template #textIntro>
            <div class="mt-6 text-[#0d2533] text-sm space-y-2">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Veritatis, ullam?
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Veritatis, ullam?
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Veritatis, ullam?
              </p>
            </div></template
          >
        </searchbar>
      </div>
      <!-- <button
        class="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-full text-lg font-semibold transition-colors duration-300">
        Đặt lịch ngay
      </button> -->
    </div>
  </section>
</template>

<script setup>
import searchbar from "@/components/composables/SearchBar.vue";
</script>

<style scoped></style>
