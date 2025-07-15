<template>
  <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
    <!-- Header -->
    <div
      class="bg-gradient-to-r from-cyan-400 to-cyan-500 text-white text-center py-3 text-lg font-semibold">
      Vui lòng chọn ngày khám
    </div>

    <!-- Month Selector -->
    <div class="flex justify-center items-center py-2">
      <button
        @click="prevMonth"
        :disabled="!canGoToPrevMonth"
        :class="{
          'text-cyan-500 hover:underline text-xl px-3': canGoToPrevMonth,
          'text-gray-300 text-xl px-3 cursor-not-allowed': !canGoToPrevMonth,
        }">
        &larr;
      </button>
      <div class="text-cyan-700 font-semibold">
        THÁNG
        {{
          currentMonth + 1 < 10 ? "0" + (currentMonth + 1) : currentMonth + 1
        }}-{{ currentYear }}
      </div>
      <button
        @click="nextMonth"
        :disabled="!canGoToNextMonth"
        :class="{
          'text-cyan-500 hover:underline text-xl px-3': canGoToNextMonth,
          'text-gray-300 text-xl px-3 cursor-not-allowed': !canGoToNextMonth,
        }">
        &rarr;
      </button>
    </div>

    <!-- Week Days -->
    <div
      class="grid grid-cols-7 text-center font-semibold border-t border-gray-100 text-sm text-gray-600">
      <div class="text-red-500">CN</div>
      <div>Hai</div>
      <div>Ba</div>
      <div>Tư</div>
      <div>Năm</div>
      <div>Sáu</div>
      <div class="text-orange-500">Bảy</div>
    </div>

    <!-- Dates -->
    <div class="grid grid-cols-7 text-center text-sm py-2">
      <div
        v-for="(day, index) in calendarDays"
        :key="index"
        class="h-10 flex items-center justify-center"
        :class="{
          'text-gray-400 cursor-not-allowed':
            !day.inCurrentMonth || !isDateSelectable(day.date),
          'text-white bg-cyan-400 rounded-lg cursor-pointer': isSelected(
            day.date
          ),
          'text-black font-semibold cursor-pointer':
            day.inCurrentMonth &&
            !isSelected(day.date) &&
            isDateSelectable(day.date),
          'bg-gray-100 rounded-lg text-cyan-600 font-bold cursor-pointer':
            isToday(day.date) && isDateSelectable(day.date),
          'text-gray-300 cursor-not-allowed':
            day.inCurrentMonth && !isDateSelectable(day.date),
        }"
        @click="isDateSelectable(day.date) && selectDate(day.date)">
        {{ day.date.getDate() }}
      </div>
    </div>
    <!-- Thêm dưới lịch -->
    <div v-if="showTimeSlots" class="p-4 border-t border-cyan-400">
      <div class="flex justify-between items-center">
        <h3 class="font-semibold text-gray-700 mb-2">Buổi sáng</h3>
        <button
          @click="clearDate"
          class="text-sm text-gray-500 hover:underline">
          Đóng
        </button>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <button
          v-for="(slot, index) in Response"
          :key="index"
          class="border border-cyan-400 text-cyan-700 rounded-md py-2 hover:bg-cyan-100 transition text-sm"
          @click="selectTimeSlot(slot)">
          {{ slot.start }} - {{ slot.end }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
import { useRoute } from "vue-router";
import { useUserStore } from "@/stores/userStore";
import { useDoctorStore } from "@/stores/getDoctorStore";
const route = useRoute();
const doctorStore = useDoctorStore();
const userStore = useUserStore();
// const months = ref([]);
const doctorID = route.params.doctorID;

const dateOfMonth = computed(
  () => doctorStore.doctorScheduleMonths[doctorID] || []
);
onMounted(async () => {
  await doctorStore.getDoctorDateOfMonth(doctorID);
  console.log("dateOfMonth ở component:", dateOfMonth.value);
});

const today = new Date();
const showTimeSlots = ref(false);
const timeSlots = ref([]);
const selectedDate = ref(new Date());

const weekdays = [
  "Chủ Nhật",
  "Thứ Hai",
  "Thứ Ba",
  "Thứ Tư",
  "Thứ Năm",
  "Thứ Sáu",
  "Thứ Bảy",
];

const selectDate = async (date) => {
  // Kiểm tra xem ngày có trong phạm vi cho phép không
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset thời gian về 00:00:00

  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 1); // Tối đa 1 tháng trong tương lai
  maxDate.setHours(23, 59, 59, 999); // Đặt thời gian cuối ngày

  if (date < today || date > maxDate) {
    console.log("Ngày không trong phạm vi cho phép");
    return;
  }

  const weekday = weekdays[date.getDay()];
  console.log(
    "Ngày được chọn:",
    weekday,
    date.getDate(),
    date.getMonth() + 1,
    date.getFullYear()
  );
  selectedDate.value = date;
  // await fetchTimeSlots();
  showTimeSlots.value = true;
};
const currentMonth = ref(today.getMonth());
const currentYear = ref(today.getFullYear());

// Computed properties để kiểm tra giới hạn tháng
const canGoToPrevMonth = computed(() => {
  const currentDate = new Date();
  const currentMonthNum = currentDate.getMonth();
  const currentYearNum = currentDate.getFullYear();

  // Không cho phép chuyển về tháng trước tháng hiện tại
  if (currentYear.value < currentYearNum) return false;
  if (
    currentYear.value === currentYearNum &&
    currentMonth.value <= currentMonthNum
  )
    return false;

  return true;
});

const canGoToNextMonth = computed(() => {
  const currentDate = new Date();
  const currentMonthNum = currentDate.getMonth();
  const currentYearNum = currentDate.getFullYear();

  // Chỉ cho phép chuyển tối đa 1 tháng trong tương lai
  if (currentYear.value > currentYearNum) return false;
  if (
    currentYear.value === currentYearNum &&
    currentMonth.value >= currentMonthNum + 1
  )
    return false;

  return true;
});

const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
const getStartDay = (month, year) => new Date(year, month, 1).getDay();
const Response = [
  { start: "07:00", end: "08:00" },
  { start: "08:00", end: "09:00" },
  { start: "09:00", end: "10:00" },
  { start: "10:00", end: "11:00" },
];
const calendarDays = computed(() => {
  const days = [];
  const totalDays = daysInMonth(currentMonth.value, currentYear.value);
  const startDay = getStartDay(currentMonth.value, currentYear.value);

  // Previous month's padding
  const prevMonth = currentMonth.value === 0 ? 11 : currentMonth.value - 1;
  const prevYear =
    currentMonth.value === 0 ? currentYear.value - 1 : currentYear.value;
  const prevMonthDays = daysInMonth(prevMonth, prevYear);

  for (let i = startDay - 1; i >= 0; i--) {
    days.push({
      date: new Date(prevYear, prevMonth, prevMonthDays - i),
      inCurrentMonth: false,
    });
  }

  // Current month days
  for (let i = 1; i <= totalDays; i++) {
    days.push({
      date: new Date(currentYear.value, currentMonth.value, i),
      inCurrentMonth: true,
    });
  }

  // Next month's padding (to fill complete weeks)
  const nextMonthPadding = 7 - (days.length % 7);
  if (nextMonthPadding < 7) {
    for (let i = 1; i <= nextMonthPadding; i++) {
      days.push({
        date: new Date(currentYear.value, currentMonth.value + 1, i),
        inCurrentMonth: false,
      });
    }
  }

  return days;
});

const isToday = (date) => {
  const now = new Date();
  return (
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  );
};

const isSelected = (date) => {
  if (!selectedDate.value) return false;
  return (
    date.getDate() === selectedDate.value.getDate() &&
    date.getMonth() === selectedDate.value.getMonth() &&
    date.getFullYear() === selectedDate.value.getFullYear()
  );
};

const isDateSelectable = (date) => {
  // Định dạng lại date thành YYYY-MM-DD theo local
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const dateStr = `${year}-${month}-${day}`;
  return dateOfMonth.value.includes(dateStr);
};

const prevMonth = () => {
  if (!canGoToPrevMonth.value) return;

  if (currentMonth.value === 0) {
    currentMonth.value = 11;
    currentYear.value--;
  } else {
    currentMonth.value--;
  }
};

const nextMonth = () => {
  if (!canGoToNextMonth.value) return;

  if (currentMonth.value === 11) {
    currentMonth.value = 0;
    currentYear.value++;
  } else {
    currentMonth.value++;
  }
};

const clearDate = () => {
  showTimeSlots.value = false;
  selectedDate.value = null;
  timeSlots.value = [];
};

const selectTimeSlot = (slot) => {
  if (!selectedDate.value) return;

  // Lấy thông tin từ route params
  const { specialtyID, hospitalID, doctorID } = route.params;

  // Lấy user ID từ store (giả sử có trong userStore)
  const userID = userStore.user?.id || 1; // fallback to 1 if not available

  // Format ngày được chọn
  const selectedDateStr = selectedDate.value.toISOString().split("T")[0];

  // Format ngày hiện tại
  const currentDateStr = new Date().toISOString().split("T")[0];

  // Tạo object với các thông tin
  const appointmentInfo = {
    userID: userID,
    doctorID: parseInt(doctorID),
    specialtyID: specialtyID,
    selectedDate: selectedDateStr,
    currentDate: currentDateStr,
    appointmentTime: {
      start: slot.start,
      end: slot.end,
    },
  };

  console.log("=== THÔNG TIN ĐẶT LỊCH KHÁM ===");
  console.log(appointmentInfo);

  const dateStr = selectedDate.value.toLocaleDateString("vi-VN");
  console.log(`Đã chọn: Ngày ${dateStr}, Giờ ${slot.start} - ${slot.end}`);
  router.push("/chon-ho-so");
};
onMounted(() => {
  clearDate();
});
</script>

<style scoped></style>
