<script setup>
// import TestLogin from "../TestLogin.vue";
// import userServices from "../../services/userServices/user.services";
import { onMounted, ref } from "vue";

// const users = ref([
//   { username: "user1", password: "123" },
//   { username: "user2", password: "123" },
//   { username: "user3", password: "123" },
// ]);
const users = ref([]);
// console.log("Users JSON:", JSON.stringify(users.value));

const currentUser = ref(null);

// get users from api
onMounted(async () => {
  try {
    const response = await loginService.getUsers();
    users.value = response;
    console.log("Users from API:", users.value);
  } catch (error) {
    console.error("Error fetching users:", error);
  }
});

const username = ref("");
const password = ref("");

const handleLogin = () => {
  // Kiểm tra nếu bất kỳ trường nào bị trống
  if (!username.value || !password.value) {
    alert("Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu!");
    return; // Dừng hàm nếu validation thất bại
  }

  const user = users.value.find(
    (u) => u.user_name === username.value && u.password === password.value
  );

  if (user) {
    currentUser.value = user;
    // console.log("User ID:", user.id);
    // console.log("Logged in user:", user);
    alert("Đăng nhập thành công");
    window.location.href = "/";
  } else {
    alert("Sai tên đăng nhập hoặc mật khẩu!");
  }
};
</script>
<template>
  <div class="flex h-screen max-w-[1140px] mx-auto">
    <!-- Bên trái: form -->
    <div class="w-1/2 bg-gray-50 flex flex-col justify-center px-20">
      <div>
        <h1 class="text-4xl font-bold text-blue-600 mb-4">
          <img src="../../assets/img/logoMepro.png" alt="" />
        </h1>
        <p class="text-lg text-gray-700 mb-6">
          Vui lòng nhập số điện thoại để tiếp tục
        </p>
        <!-- <main>
          <TestLogin />
        </main> -->
        <!-- Input số điện thoại -->
        <div class="flex items-center border rounded-md overflow-hidden mb-4">
          <span class="px-4 py-3 bg-white text-sm flex items-center gap-2">
            Tên đăng nhập
          </span>
          <input
            v-model="username"
            type="text"
            placeholder="Tên đăng nhập"
            class="flex-1 px-4 py-3 outline-none" />
        </div>

        <!-- passwd input  -->
        <div class="flex items-center border rounded-md overflow-hidden mb-4">
          <span class="px-4 py-3 bg-white text-sm flex items-center gap-2">
            Password
          </span>
          <input
            v-model="password"
            type="password"
            placeholder="Password"
            class="flex-1 px-4 py-3 outline-none" />
        </div>

        <!-- Nút Tiếp tục -->
        <button
          @click="handleLogin"
          class="w-full bg-sky-500 text-white py-3 rounded-md hover:bg-sky-600 transition duration-300 mb-6">
          Tiếp tục
        </button>

        <!-- Đăng nhập bằng tài khoản khác -->
        <div class="text-center text-sm text-gray-500 mb-4">
          Hoặc đăng nhập bằng tài khoản
        </div>

        <div class="space-y-3">
          <button
            class="w-full flex items-center justify-center gap-2 bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition">
            Đăng nhập với Google
          </button>
          <button
            class="w-full flex items-center justify-center gap-2 bg-blue-800 text-white py-2 rounded-md hover:bg-blue-900 transition">
            <i class="fi fi-brands-facebook"></i>
            Đăng nhập với Facebook
          </button>
          <i class="fi fi-brands-facebook"></i>
        </div>
      </div>
    </div>
    <!-- Bên phải: hình ảnh + quote -->
    <div
      class="w-1/2 relative bg-cover bg-center"
      style="background-image: url('../../assets/img-bg-signup.png')">
      <!-- Overlay nếu cần -->
      <div class="absolute inset-0 bg-white bg-opacity-60"></div>

      <div class="relative z-10 h-full flex items-center justify-center px-16">
        <div
          class="text-right font-serif italic text-gray-800 text-xl leading-relaxed">
          <p>“Không còn:</p>
          <p><s>xếp hàng</s></p>
          <p><s>chờ đợi</s></p>
          <p>Để lấy số khám bệnh”</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
