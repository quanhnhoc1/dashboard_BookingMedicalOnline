import { defineStore } from "pinia";
import { getHospitalsPrivate as getHospitalsPrivateAPI } from "../services/hospitalService.js";
import { getHospitalsPublic as getHospitalsPublicAPI } from "../services/hospitalService.js";
export const userHospitalsStore = defineStore("hospitals", {
  state: () => ({ selectedHospital: null }),
  getters: {},
  actions: {
    async getHospitalsPrivate() {
      try {
        const res = await getHospitalsPrivateAPI();
        return res;
      } catch (error) {
        console.error("Error fetching private hospitals:", error);
        throw error;
      }
    },
    async getHospitalsPublic() {
      try {
        const res = await getHospitalsPublicAPI();
        return res;
      } catch (error) {
        console.error("Error fetching public hospitals:", error);
        throw error;
      }
    },
    setHospital(hospital) {
      this.selectedHospital = hospital;
    },
    clearHospital() {
      this.selectedHospital = null;
    },
  },
  persist: true,
});
