<template>
  <h1>this is a licnic page</h1>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useSearchStore } from "@/stores/searchStore";

const searchStore = useSearchStore();

onMounted(() => {
  searchStore.setTitlePage("Phòng khám");
});
</script>

<style scoped></style>
