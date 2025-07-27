<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
    <div
      class="max-w-6xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
      <div class="flex">
        <!-- Left side - Register Form -->
        <div class="w-full lg:w-1/2 p-8 lg:p-12">
          <div class="max-w-md mx-auto">
            <!-- Logo and Header -->
            <div class="text-center mb-8">
              <!-- <img
                src="../../assets/img/logoMepro.png"
                alt="MePro Logo"
                class="h-20 mx-auto mb-6" /> -->
              <h1 class="text-3xl font-bold text-gray-800 mb-2">
                Tạo tài khoản mới
              </h1>
              <p class="text-gray-600">Đăng ký để bắt đầu sử dụng dịch vụ</p>
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

            <!-- Success Message -->
            <div
              v-if="successMessage"
              class="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
              <div class="flex items-center">
                <svg
                  class="w-5 h-5 text-green-500 mr-3"
                  fill="currentColor"
                  viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"></path>
                </svg>
                <span class="text-green-700 text-sm font-medium">{{
                  successMessage
                }}</span>
              </div>
            </div>

            <!-- Register Form -->
            <form @submit.prevent="handleRegister" class="space-y-6">
              <!-- Full Name Input -->
              <div>
                <label
                  for="fullName"
                  class="block text-sm font-semibold text-gray-700 mb-3">
                  Họ và tên
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
                    id="fullName"
                    v-model="fullName"
                    type="text"
                    placeholder="Nhập họ và tên của bạn"
                    class="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 text-gray-700"
                    required />
                </div>
              </div>

              <!-- Email Input -->
              <div>
                <label
                  for="email"
                  class="block text-sm font-semibold text-gray-700 mb-3">
                  Email
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
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
                    </svg>
                  </div>
                  <input
                    id="email"
                    v-model="email"
                    type="email"
                    placeholder="Nhập email của bạn"
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
                    :type="showPassword ? 'text' : 'password'"
                    placeholder="Nhập mật khẩu"
                    class="w-full pl-12 pr-12 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 text-gray-700"
                    required />
                  <button
                    type="button"
                    @click="togglePassword"
                    class="absolute inset-y-0 right-0 pr-4 flex items-center">
                    <svg
                      v-if="showPassword"
                      class="h-5 w-5 text-gray-400 hover:text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"></path>
                    </svg>
                    <svg
                      v-else
                      class="h-5 w-5 text-gray-400 hover:text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                  </button>
                </div>
              </div>

              <!-- Confirm Password Input -->
              <div>
                <label
                  for="confirmPassword"
                  class="block text-sm font-semibold text-gray-700 mb-3">
                  Nhập lại mật khẩu
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
                    id="confirmPassword"
                    v-model="confirmPassword"
                    :type="showConfirmPassword ? 'text' : 'password'"
                    placeholder="Nhập lại mật khẩu"
                    class="w-full pl-12 pr-12 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 text-gray-700"
                    required />
                  <button
                    type="button"
                    @click="toggleConfirmPassword"
                    class="absolute inset-y-0 right-0 pr-4 flex items-center">
                    <svg
                      v-if="showConfirmPassword"
                      class="h-5 w-5 text-gray-400 hover:text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"></path>
                    </svg>
                    <svg
                      v-else
                      class="h-5 w-5 text-gray-400 hover:text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                  </button>
                </div>
              </div>

              <!-- Password Strength Indicator -->
              <div v-if="password" class="space-y-2">
                <div class="flex items-center justify-between text-sm">
                  <span class="text-gray-600">Độ mạnh mật khẩu:</span>
                  <span :class="passwordStrengthClass">{{
                    passwordStrengthText
                  }}</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div
                    class="h-2 rounded-full transition-all duration-300"
                    :class="passwordStrengthBarClass"
                    :style="{ width: passwordStrengthPercentage + '%' }"></div>
                </div>
              </div>

              <!-- Register Button -->
              <button
                type="submit"
                :disabled="isLoading"
                class="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 focus:ring-4 focus:ring-blue-200 transition duration-200 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
                <span class="flex items-center justify-center">
                  <svg
                    v-if="isLoading"
                    class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24">
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <svg
                    v-else
                    class="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
                  </svg>
                  {{ isLoading ? "Đang đăng ký..." : "Đăng ký" }}
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

            <!-- Social Register Buttons -->
            <div class="space-y-4">
              <!-- Google Register -->
              <button
                @click="handleGoogleRegister"
                class="w-full bg-white border border-gray-300 text-gray-700 py-4 px-6 rounded-xl font-semibold hover:bg-gray-50 focus:ring-4 focus:ring-gray-200 transition duration-200 transform hover:scale-105 shadow-md">
                <div class="flex items-center justify-center gap-3">
                  <svg class="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  <span>Đăng ký với Google</span>
                </div>
              </button>
            </div>

            <!-- Footer -->
            <div class="mt-8 text-center">
              <p class="text-sm text-gray-600">
                Đã có tài khoản?
                <router-link
                  to="/login"
                  class="text-blue-600 hover:text-blue-700 font-semibold"
                  >Đăng nhập ngay</router-link
                >
              </p>
            </div>
          </div>
        </div>

        <!-- Right side - Image -->
        <div
          class="hidden lg:block lg:w-1/2 bg-gradient-to-br from-green-600 to-blue-700 relative">
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
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
                </svg>
              </div>
              <h2 class="text-4xl font-bold mb-4">Tham gia cùng chúng tôi</h2>
              <p class="text-xl text-white/90 leading-relaxed">
                "Tạo tài khoản để trải nghiệm dịch vụ<br />
                đặt lịch khám bệnh tiện lợi và nhanh chóng."
              </p>
              <div class="mt-8 flex justify-center space-x-8">
                <div class="text-center">
                  <div class="text-2xl font-bold">Miễn phí</div>
                  <div class="text-sm text-white/80">Đăng ký</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold">An toàn</div>
                  <div class="text-sm text-white/80">Bảo mật</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold">Nhanh chóng</div>
                  <div class="text-sm text-white/80">Thủ tục</div>
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
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { Register } from "@/services/authService";

const router = useRouter();
const fullName = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const errorMessage = ref("");
const successMessage = ref("");
const isLoading = ref(false);
const showPassword = ref(false);
const showConfirmPassword = ref(false);

// Password strength calculation
const passwordStrength = computed(() => {
  if (!password.value) return 0;

  let score = 0;

  // Length check
  if (password.value.length >= 8) score += 25;
  if (password.value.length >= 12) score += 25;

  // Character variety checks
  if (/[a-z]/.test(password.value)) score += 10;
  if (/[A-Z]/.test(password.value)) score += 10;
  if (/[0-9]/.test(password.value)) score += 10;
  if (/[^A-Za-z0-9]/.test(password.value)) score += 20;

  return Math.min(score, 100);
});

const passwordStrengthText = computed(() => {
  const strength = passwordStrength.value;
  if (strength < 30) return "Yếu";
  if (strength < 60) return "Trung bình";
  if (strength < 80) return "Mạnh";
  return "Rất mạnh";
});

const passwordStrengthClass = computed(() => {
  const strength = passwordStrength.value;
  if (strength < 30) return "text-red-500";
  if (strength < 60) return "text-yellow-500";
  if (strength < 80) return "text-blue-500";
  return "text-green-500";
});

const passwordStrengthBarClass = computed(() => {
  const strength = passwordStrength.value;
  if (strength < 30) return "bg-red-500";
  if (strength < 60) return "bg-yellow-500";
  if (strength < 80) return "bg-blue-500";
  return "bg-green-500";
});

const passwordStrengthPercentage = computed(() => {
  return passwordStrength.value;
});

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const toggleConfirmPassword = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
};

const validateForm = () => {
  errorMessage.value = "";

  // Full Name validation
  if (!fullName.value.trim()) {
    errorMessage.value = "Họ và tên không được để trống!";
    return false;
  }

  if (fullName.value.trim().length < 2) {
    errorMessage.value = "Họ và tên phải có ít nhất 2 ký tự!";
    return false;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    errorMessage.value = "Email không hợp lệ!";
    return false;
  }

  // Password validation
  if (password.value.length < 8) {
    errorMessage.value = "Mật khẩu phải có ít nhất 8 ký tự!";
    return false;
  }

  // Confirm password validation
  if (password.value !== confirmPassword.value) {
    errorMessage.value = "Mật khẩu nhập lại không khớp!";
    return false;
  }

  return true;
};

const handleRegister = async () => {
  if (!validateForm()) return;

  isLoading.value = true;
  errorMessage.value = "";

  try {
    console.log("=== Register Form Debug ===");
    console.log("Full Name:", fullName.value);
    console.log("Email:", email.value);
    console.log("Password length:", password.value.length);
    console.log("Password strength:", passwordStrength.value);

    const response = await Register({
      fullName: fullName.value,
      email: email.value,
      password: password.value,
    });

    console.log("Registration successful:", response);

    successMessage.value =
      "Đăng ký thành công! Chuyển hướng đến trang đăng nhập...";

    // Redirect to login after 2 seconds
    setTimeout(() => {
      router.push("/login");
    }, 2000);
  } catch (error) {
    console.error("Registration error:", error);
    errorMessage.value = error.message || "Đăng ký thất bại! Vui lòng thử lại.";
  } finally {
    isLoading.value = false;
  }
};

const handleGoogleRegister = () => {
  // TODO: Implement Google registration
  errorMessage.value = "Tính năng đăng ký bằng Google đang được phát triển!";
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

/* Password strength bar animation */
.password-strength-bar {
  transition: all 0.3s ease;
}
</style>
