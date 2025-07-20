import { defineStore } from "pinia";

export const useRouteStore = defineStore("route", {
  state: () => ({}),
  actions: {
    gotoAddnewUserprofileFrom(router) {
      router.push({
        name: "CreateNewMedicalRecord",
      });
    },
  },
});
