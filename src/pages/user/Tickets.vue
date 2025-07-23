<template>
  <div class="">
    <h2 class="text-2xl font-semibold mb-4">Danh sách phiếu khám bệnh</h2>

    <div class="flex space-x-4 mb-6">
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        :class="[
          'px-6 py-2 rounded-full',
          selected === index
            ? 'bg-cyan-500 text-white'
            : 'bg-gray-100 text-gray-700',
        ]"
        @click="selected = index">
        {{ tab }}
      </button>
    </div>

    <!-- Sử dụng component BookingTicketCard -->
    <BookingTicketCard v-if="selected === 0" />
    <CancelledTicketCard v-if="selected === 3" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import BookingTicketCard from "@/components/BookingTicketCard.vue";
import CancelledTicketCard from "@/components/CancelledTicketCard.vue";
const tabs = ["Đã thanh toán", "Chưa thanh toán", "Đã khám", "Đã huỷ"];
const selected = ref(0);
</script>
