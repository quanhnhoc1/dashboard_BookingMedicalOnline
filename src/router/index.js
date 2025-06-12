import { createRouter, createWebHistory } from "vue-router";
import homePage from "../components/homePage.vue";
import adminLayout from "../layouts/AdminLayout.vue";
import ClinicRevenue from "@/pages/admin/revenue/ClinicRevenue.vue";
import DoctorRevenue from "@/pages/admin/revenue/DoctorRevenue.vue";
import testLayout from "@/layouts/test.layout.vue";
const routes = [
  {
    path: "/",
    name: "user-home",
    component: () => import("@/layouts/UserLayout.vue"),
  },
  {
    path: "/testlayout",
    name: "testlayout",
    component: testLayout,
    children: [
      {
        path: "/test",
        name: "test",
        component: () => import("@/layouts/UserDashboard.vue"),
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
        path: "/home",
        name: "home",
        component: homePage,
      },
      {
        path: "/revenue-doctor",
        name: "doctor-revenue",
        component: DoctorRevenue,
      },
      {
        path: "/revenue-clinic",
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
