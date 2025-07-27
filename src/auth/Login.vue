<!-- <script setup>
import { onMounted, ref } from "vue";

const users = ref([]);

const currentUser = ref(null);

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
</script> -->
<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
    <div
      class="max-w-6xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
      <div class="flex">
        <!-- Left side - Login Form -->
        <div class="w-full lg:w-1/2 p-8 lg:p-12">
          <div class="max-w-md mx-auto">
            <!-- Logo and Header -->
            <div class="text-center mb-8">
              <!-- <img
                src="../../assets/img/logoMepro.png"
                alt="MePro Logo"
                class="h-20 mx-auto mb-6" /> -->
              <h1 class="text-3xl font-bold text-gray-800 mb-2">
                Chào mừng trở lại
              </h1>
              <p class="text-gray-600">Đăng nhập để tiếp tục sử dụng dịch vụ</p>
            </div>

            <!-- Error Message -->
            <div
              v-if="errorMessage"
              class="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <div class="flex items-center">
                <svg
                  class="w-5 h-5 text-red-500 mr-3"
                  fill="currentColor"
                  viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clip-rule="evenodd"></path>
                </svg>
                <span class="text-red-700 text-sm font-medium">{{
                  errorMessage
                }}</span>
              </div>
            </div>

            <!-- Login Form -->
            <form @submit.prevent="handleLogin" class="space-y-6">
              <!-- Username Input -->
              <div>
                <label
                  for="username"
                  class="block text-sm font-semibold text-gray-700 mb-3">
                  Tên đăng nhập
                </label>
                <div class="relative">
                  <div
                    class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg
                      class="h-5 w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                  </div>
                  <input
                    id="username"
                    v-model="username"
                    type="text"
                    placeholder="Nhập tên đăng nhập"
                    class="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 text-gray-700"
                    required />
                </div>
              </div>

              <!-- Password Input -->
              <div>
                <label
                  for="password"
                  class="block text-sm font-semibold text-gray-700 mb-3">
                  Mật khẩu
                </label>
                <div class="relative">
                  <div
                    class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg
                      class="h-5 w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                    </svg>
                  </div>
                  <input
                    id="password"
                    v-model="password"
                    type="password"
                    placeholder="Nhập mật khẩu"
                    class="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 text-gray-700"
                    required />
                </div>
              </div>

              <!-- Login Button -->
              <button
                type="submit"
                class="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 focus:ring-4 focus:ring-blue-200 transition duration-200 transform hover:scale-105 shadow-lg">
                <span class="flex items-center justify-center">
                  <svg
                    class="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
                  </svg>
                  Đăng nhập
                </span>
              </button>
            </form>

            <!-- Divider -->
            <div class="my-8 flex items-center">
              <div class="flex-1 border-t border-gray-300"></div>
              <span class="px-4 text-sm text-gray-500 bg-white font-medium"
                >hoặc</span
              >
              <div class="flex-1 border-t border-gray-300"></div>
            </div>

            <!-- Social Login Buttons -->
            <div class="space-y-4 flex">
              <!-- Google Login -->
              <GoogleLogin :callback="handleGoogleLogin" class="abc" />
              <!-- Facebook Login -->
              <!-- <div>
                <button
                  class="w-full flex items-center justify-center gap-3 bg-white text-gray-700 border-2 border-gray-300 py-4 px-6 rounded-xl font-semibold hover:bg-gray-100 focus:ring-4 focus:ring-blue-200 transition duration-200 transform hover:scale-105 shadow-md">
                  <svg class="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                    <path
                      d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Đăng nhập bằng Facebook
                </button>
              </div> -->
            </div>

            <!-- Footer -->
            <div class="mt-8 text-center">
              <p class="text-sm text-gray-600">
                Chưa có tài khoản?
                <RouterLink
                  to="/register"
                  class="text-blue-600 hover:text-blue-700 font-semibold"
                  >Đăng ký ngay</RouterLink
                >
              </p>
            </div>
          </div>
        </div>

        <!-- Right side - Image -->
        <div
          class="hidden lg:block lg:w-1/2 bg-gradient-to-br from-blue-600 to-purple-700 relative">
          <div class="absolute inset-0 bg-black bg-opacity-20"></div>
          <div
            class="relative z-10 h-full flex items-center justify-center p-12">
            <div class="text-center text-white">
              <div class="mb-8">
                <svg
                  class="w-24 h-24 mx-auto mb-6 text-white/80"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
              </div>
              <h2 class="text-4xl font-bold mb-4">Chăm sóc sức khỏe</h2>
              <p class="text-xl text-white/90 leading-relaxed">
                "Không còn xếp hàng, không còn chờ đợi.<br />
                Đặt lịch khám bệnh một cách nhanh chóng và tiện lợi."
              </p>
              <div class="mt-8 flex justify-center space-x-8">
                <div class="text-center">
                  <div class="text-2xl font-bold">24/7</div>
                  <div class="text-sm text-white/80">Hỗ trợ</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold">100+</div>
                  <div class="text-sm text-white/80">Bác sĩ</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold">50+</div>
                  <div class="text-sm text-white/80">Bệnh viện</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import { GoogleLogin } from "vue3-google-login";

const router = useRouter();
const authStore = useAuthStore();
const username = ref("");
const password = ref("");
const errorMessage = ref("");

const handleLogin = async () => {
  errorMessage.value = "";
  if (!username.value || !password.value) {
    alert("Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu!");
    return;
  }
  try {
    await authStore.login({
      user: username.value, // username là email
      password: password.value,
    });
    const role = authStore.userRole;
    if (role === "admin") {
      router.push("/admin");
    } else if (role === "user") {
      router.push("/");
    } else {
      errorMessage.value = "Bạn không có quyền truy cập!";
    }
  } catch (error) {
    errorMessage.value = error.message || "Sai tên đăng nhập hoặc mật khẩu!";
    console.error("Login error:", error);
  }
};

const handleGoogleLogin = async (response) => {
  try {
    console.log("Google login response:", response);
    console.log(
      "Google credential length:",
      response.credential ? response.credential.length : 0
    );
    console.log(
      "Google credential starts with:",
      response.credential
        ? response.credential.substring(0, 50) + "..."
        : "null"
    );
    console.log(
      "Google credential ends with:",
      response.credential
        ? "..." + response.credential.substring(response.credential.length - 50)
        : "null"
    );

    // Đảm bảo token không bị cắt ngắn
    if (!response.credential || response.credential.length < 100) {
      throw new Error("Google token không hợp lệ hoặc bị cắt ngắn");
    }

    await authStore.googleLogin(response.credential);
    const role = authStore.userRole;
    if (role === "admin") {
      router.push("/admin");
    } else if (role === "user") {
      router.push("/");
    } else {
      errorMessage.value = "Bạn không có quyền truy cập!";
    }
  } catch (error) {
    errorMessage.value = error.message || "Đăng nhập Google thất bại!";
    console.error("Google login error:", error);
  }
};
</script>

<style scoped>
/* Custom animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* .animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out;
} */

/* Gradient text effect */
/* .gradient-text {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
} */

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Simple Google Login Button - keep it minimal */
:deep(.g_id_signin) {
  width: 100% !important;
}

/* Layout for horizontal buttons */
.space-y-4.flex {
  gap: 16px;
}

.space-y-4.flex > div {
  flex: 1;
}

/* Facebook button styling */
.space-y-4.flex button {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background: white;
  border: 2px solid #d1d5db;
  color: #374151;
  padding: 16px 24px;
  border-radius: 12px;
  font-weight: 600;
  transition: all 0.2s ease;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.space-y-4.flex button:hover {
  background: #f9fafb;
  transform: scale(1.02);
}
</style>
