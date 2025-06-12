import { createRouter, createWebHistory } from "vue-router";
import homePage from "../components/homePage.vue";
import adminLayout from "../layouts/AdminLayout.vue";
import ClinicRevenue from "@/pages/admin/revenue/ClinicRevenue.vue";
import DoctorRevenue from "@/pages/admin/revenue/DoctorRevenue.vue";
import testLayout from "@/layouts/test.layout.vue";
import publicHospital from "@/pages/medical-facility/public-hospital.vue";
import privateHospital from "@/pages/medical-facility/private-hospital.vue";
import MedicalFacilityLayout from "@/layouts/MedicalFacilityLayout.vue";

const routes = [
  {
    path: "/co-so-y-te",
    name: "medical-facility-layout",
    component: MedicalFacilityLayout,
    // redirect: "/co-so-y-te/benh-vien-cong", // Redirect mặc định
    children: [
      {
        path: "benh-vien-cong",
        name: "public-hospital",
        component: publicHospital,
      },
      {
        path: "benh-vien-tu",
        name: "private-hospital",
        component: privateHospital,
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/auth/Login.vue"),
  },
  {
    path: "/admin",
    name: "adminLayout",
    component: adminLayout,
    children: [
      {
        path: "/home", // ✅ ĐÃ SỬA
        name: "home",
        component: homePage,
      },
      {
        path: "/admin/revenue-doctor", // ✅
        name: "doctor-revenue",
        component: DoctorRevenue,
      },
      {
        path: "/revenue-clinic", // ✅
        name: "clinic-revenue",
        component: ClinicRevenue,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
