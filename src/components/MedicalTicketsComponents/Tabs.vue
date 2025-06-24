<!-- <template>
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
</template>

<script setup>
import { ref } from "vue";

const tabs = ["Đã thanh toán", "Chưa thanh toán", "Đã khám", "Đã huỷ"];
const selected = ref(0);
</script> -->
