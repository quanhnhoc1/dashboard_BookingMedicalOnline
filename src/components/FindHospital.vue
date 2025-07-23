<template>
  <div class="bg-blue-50">
    <div class="flex max-w-[1170px] mx-auto my-4 bg-blue-50">
      <span class="text-bold text-gray-900 font-bold"
        >Trang chủ >
        <span class="text-[#00b5f1] text-m">
          {{ getCurrentCategoryLabel }}
        </span></span
      >
    </div>

    <div class="flex flex-col items-center justify-center bg-gray-100 p-10">
      <p class="text-[#00b5f1] text-2xl font-bold">
        {{ getCurrentCategoryLabel }}
      </p>
      <div class="title">
        <p class="m-2">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi
          nobis aspernatur autem, vero fugit odit sunt sed voluptates ipsam
          corrupti?
        </p>
        <div>
          <SearchBar />
        </div>
      </div>
    </div>

    <hr />

    <CategoryTabs v-model="selectedCategory" :categories="categories" />
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import SearchBar from "@/components/composables/SearchBar.vue";
import CategoryTabs from "@/components/CategoryTabs.vue";
import { useSearchStore } from "@/stores/searchStore";
// import PageFooter from "@/layouts/PageFooter.vue";

const searchStore = useSearchStore();

const selectedCategory = ref("benh-vien-cong");

const categories = [
  {
    label: "Bệnh viện công",
    value: "benh-vien-cong",
    count: 38,
    href: "/co-so-y-te/benh-vien-cong",
  },
  {
    label: "Bệnh viện tư",
    value: "benh-vien-tu",
    count: 25,
    href: "/co-so-y-te/benh-vien-tu",
  },
  {
    label: "Phòng khám",
    value: "phong-kham",
    count: 257,
    href: "/co-so-y-te/phong-kham",
  },
  { label: "Phòng mạch", value: "phong-mach", count: 1 },
  { label: "Xét nghiệm", value: "xet-nghiem", count: 51 },
  { label: "Y tế tại nhà", value: "y-te-tai-nha", count: 10 },
  { label: "Tiêm chủng", value: "tiem-chung", count: 10 },
];

// Computed property để lấy label của category hiện tại
const getCurrentCategoryLabel = computed(() => {
  const currentCategory = categories.find(
    (cat) => cat.value === selectedCategory.value
  );
  return currentCategory ? currentCategory.label : "Cơ Sở Y Tế";
});
</script>

<style scoped></style>
