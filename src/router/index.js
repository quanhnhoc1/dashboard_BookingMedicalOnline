import { createRouter, createWebHistory } from "vue-router";
import homePage from "../components/homePage.vue";
import adminLayout from "../layouts/AdminLayout.vue";
import ClinicRevenue from "@/pages/admin/revenue/ClinicRevenue.vue";
import DoctorRevenue from "@/pages/admin/revenue/DoctorRevenue.vue";
import testLayout from "@/layouts/test.layout.vue";
import publicHospital from "@/pages/medicalFacilities/PublicHospitalPage.vue";
import privateHospital from "@/pages/medicalFacilities/PrivateHospitalPage.vue";
import MedicalFacilityLayout from "@/layouts/MedicalFacilityLayout.vue";
import MedicalServicesLayout from "@/layouts/MedicalServicesLayout.vue";
import MedicalTickets from "@/layouts/MedicalTickets.vue";
const routes = [
  {
    path: "/",
    name: "userDashboard",
    component: testLayout,
    meta: { requiresAuth: true, allowedRoles: ["user"] },
  },
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
      {
        path: "phong-kham",
        name: "clinic-hospital",
        component: () => import("@/pages/medicalFacilities/ClinicPage.vue"),
      },
    ],
  },

  {
    path: "/dich-vu-y-te",
    name: "medical-service",
    component: MedicalServicesLayout,
  },

  {
    path: "/user-profile",
    name: "userProfile",
    component: MedicalTickets,
    children: [
      {
        path: "/ho-so-benh-nhan",
        name: "HoSoBenhNhan",
        component: () => import("@/pages/user/UserProfile.vue"),
      },
      {
        path: "/phieu-kham-benh",
        name: "PhieuKhamBenh",
        component: () => import("@/pages/user/Tickets.vue"),
      },
      {
        path: "/thong-bao",
        name: "ThongBao",
        component: () => import("@/pages/user/Notifications.vue"),
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
    meta: { requiresAuth: true, allowedRoles: ["admin"] },
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

// Route guard
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  // Nếu route yêu cầu xác thực
  if (to.meta.requiresAuth) {
    // Kiểm tra đã đăng nhập chưa
    if (!token || !user) {
      next("/login");
      return;
    }

    // Kiểm tra role có được phép truy cập không
    if (to.meta.allowedRoles && !to.meta.allowedRoles.includes(user.role)) {
      // Hiển thị thông báo không có quyền truy cập
      alert("Bạn không được truy cập vào trang này!");

      // Nếu không có quyền, chuyển về trang phù hợp với role
      if (user.role === "admin") {
        next("/admin");
      } else if (user.role === "user") {
        next("/");
      } else {
        next("/login");
      }
      return;
    }
  }

  // Nếu đã đăng nhập và truy cập trang login, chuyển về trang phù hợp
  if (to.path === "/login" && token && user) {
    if (user.role === "admin") {
      next("/admin");
    } else if (user.role === "user") {
      next("/");
    } else {
      next("/");
    }
    return;
  }

  next();
});

export default router;
