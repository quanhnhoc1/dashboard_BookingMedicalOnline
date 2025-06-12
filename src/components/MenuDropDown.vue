<!-- components/DropdownMenu.vue -->
<template>
  <div
    class="relative"
    @mouseenter="visible = true"
    @mouseleave="visible = false">
    <button class="inline-flex items-center hover:text-blue-600">
      <!-- <span>{{ title }}</span> -->
      <router-link :to="link">
        <span>{{ title }}</span>
      </router-link>
      <svg
        class="w-3 h-3 ml-0.5 relative left-2"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        viewBox="0 0 10 6">
        <path d="M1 1l4 4 4-4" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>

    <!-- Dropdown menu with transition -->
    <transition name="fade">
      <div
        v-if="visible"
        class="absolute left-0 top-full mt-2 z-10 w-44 bg-white rounded-lg shadow divide-y divide-gray-100">
        <ul class="py-2 text-sm text-gray-700">
          <li v-for="(item, index) in items" :key="index">
            <router-link
              :to="item.href"
              class="block px-4 py-2 hover:bg-gray-100">
              {{ item.label }}
            </router-link>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  title: String,
  items: Array,
  link: String,
});

const visible = ref(false);
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
