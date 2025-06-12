<script setup>
import SearchBar from "@/components/SearchBar.vue";
import { ref } from "vue";
import { RouterLink } from "vue-router";

// Toggle for dropdown user menu
const showDropDown = ref(false);

// Toggle for sidebar
const showSide = ref(true);

// Toggle function
const toggleSideBar = () => {
  showSide.value = !showSide.value;
};

const toggleDrop = () => {
  showDropDown.value = !showDropDown.value;
};
const isProfileOpen = ref(false);
const toggleProfileDropdown = () => {
  isProfileOpen.value = !isProfileOpen.value;
};
</script>

<template>
  <div class="w-screen h-screen flex select-none">
    <!-- Sidebar -->
    <div v-show="showSide" class="w-[400px] h-full bg-gray-200 text-white">
      <div class="h-[50px] bg-gray-900 flex items-center px-5">
        <h3 class="font-bold text-xl">Admin Dashboard</h3>
      </div>
      <div
        class="h-[calc(100vh-50px)] bg-gray-800 py-5 px-5 flex flex-col justify-between">
        <div class="space-y-2">
          <router-link to="/home" class="menu-item">🏠 Home</router-link>
          <!-- <router-link to="/profile" class="menu-item">👤 Profile</router-link> -->

          <!-- Dropdown Profile Menu -->
          <div>
            <div
              @click="toggleProfileDropdown"
              class="menu-item cursor-pointer flex justify-between items-center">
              👤 Profile
              <span>{{ isProfileOpen ? "⬆️" : "⬇️" }}</span>
            </div>
            <div
              v-show="isProfileOpen"
              class="ml-4 mt-1 space-y-1 transition-all duration-200">
              <router-link to="/revenue-doctor" class="menu-item"
                >📊 Doanh thu bác sĩ</router-link
              >
              <router-link to="/revenue-clinic" class="menu-item"
                >🏥 Doanh thu bệnh viện</router-link
              >
            </div>
          </div>

          <router-link to="/dashboard" class="menu-item"
            >💬 Messages</router-link
          >
          <!-- <router-link to="/download" class="menu-item"
            >⬇️ Download</router-link
          > -->
        </div>
        <router-link to="/setting" class="menu-item">⚙️ Setting</router-link>
      </div>
    </div>

    <!-- Main Content -->
    <div class="w-full h-full bg-gray-400">
      <!-- Top Navbar -->
      <div
        class="h-[50px] bg-gray-100 flex items-center shadow-sm px-5 border-b relative">
        <!-- Hamburger Menu -->
        <div class="cursor-pointer w-[30px]" @click="toggleSideBar">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            class="w-6 h-6">
            <path
              d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
          </svg>
        </div>

        <!-- Search Bar -->
        <SearchBar />

        <!-- User Dropdown -->
        <div class="w-[200px] ml-auto relative">
          <div
            class="flex items-center space-x-3 cursor-pointer"
            @click="toggleDrop">
            <img
              src="https://yt3.ggpht.com/hqsxh-Vnbw9OK0_X4DAWh6RkmEUVnL-82SRCyh-IKr9fIXR8zhUCRdBEwgWWL_14q_L8Piod=s108-c-k-c0x00ffffff-no-rj"
              class="w-10 h-10 rounded-full border-2 border-white"
              alt="User" />
            <div class="text-left">
              <div class="font-semibold">Madona, Dev OP</div>
              <div class="text-xs text-gray-500">Admin</div>
            </div>
          </div>

          <!-- Dropdown Menu -->
          <div
            v-show="showDropDown"
            class="absolute right-0 mt-2 w-56 bg-white border rounded-md shadow-lg z-50">
            <a
              href="#"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >Account settings</a
            >
            <a
              href="#"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >Support</a
            >
            <a
              href="#"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >License</a
            >

            <RouterLink
              to="/login"
              class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Sign out</RouterLink
            >
          </div>
        </div>
      </div>

      <!-- Main View -->
      <div class="h-[calc(100vh-50px)] bg-gray-50 p-5">
        <div class="border border-gray-300 rounded-md p-5 h-full">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.menu-item {
  display: block;
  padding: 10px;
  width: 100%;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  color: white;
  background-color: transparent;
  transition: all 0.3s;
}

.menu-item:hover {
  background-color: #d1d5db;
  color: #1f2937;
}
</style>
