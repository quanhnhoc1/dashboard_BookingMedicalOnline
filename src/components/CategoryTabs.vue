<template>
  <div class="flex justify-center bg-gray-100 p-8">
    <!-- Center wrapper -->
    <div class="flex flex-wrap gap-2 max-w-[1170px] w-full">
      <RouterLink
        v-for="category in categories"
        :key="category.value"
        :to="category.href"
        :class="[
          'px-4 py-2 rounded-full text-sm font-medium transition',
          modelValue === category.value
            ? 'bg-[#00b5f1] text-white shadow-md'
            : 'bg-blue-50 text-[#00b5f1] hover:bg-[#00b5f1]/10',
        ]"
        @click="$emit('update:modelValue', category.value)">
        {{ category.label }}
        <span v-if="category.count">({{ category.count }})</span>
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
defineProps({
  modelValue: String,
  categories: {
    type: Array,
    default: () => [],
  },
});

defineEmits(["update:modelValue"]);
</script>
