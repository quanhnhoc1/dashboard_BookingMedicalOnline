import { defineStore } from "pinia";
import {
  getDoctorFromSpecialtyIDServicesAndIDHospital,
  getHospitalsPrivate as getHospitalsPrivateAPI,
} from "../services/hospitalService.js";
import { getHospitalsPublic as getHospitalsPublicAPI } from "../services/hospitalService.js";
import { getSpecialtiesWithHospitalID } from "../services/hospitalService.js";

export const userHospitalsStore = defineStore("hospitals", {
  state: () => ({
    selectedHospital: null,
    selectedSpecialty: null,
    selectedDoctor: null,
    selectedSchedule: null, // Thêm selectedSchedule
    specialties: [],
  }),
  getters: {},
  actions: {
    async getHospitalsPrivate() {
      try {
        const res = await getHospitalsPrivateAPI();
        console.log(res);
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
    setSelectedSpecialty(specialty) {
      this.selectedSpecialty = specialty;
    },
    setHospital(hospital) {
      this.selectedHospital = hospital;
    },
    setSelectedDoctor(doctor) {
      this.selectedDoctor = doctor;
    },
    setSelectedSchedule(schedule) {
      this.selectedSchedule = schedule;
    },
    clearHospital() {
      this.selectedHospital = null;
    },

    async getSpecialtiesWithHospitalID(hospitalID) {
      if (this.specialties.length > 0) return this.specialties;

      try {
        const res = await getSpecialtiesWithHospitalID(hospitalID);
        this.specialties = res;
        return res;
      } catch (err) {
        console.error(
          "Error fetching specialties for hospital ID:",
          hospitalID,
          err
        );
        throw err;
      }
    },
    async getDoctorsWithSpecialtyIDAndHospitalID(specialtyID, hospitalID) {
      try {
        const res = await getDoctorFromSpecialtyIDServicesAndIDHospital(
          specialtyID,
          hospitalID
        );
        return res;
      } catch (error) {
        throw error;
      }
    },
  },
  persist: true,
});
