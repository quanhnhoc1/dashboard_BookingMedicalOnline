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
import serviceMenuItems from "@/components/composables/serviceMenuItems.vue";
import bookingOptionsPage from "@/pages/medicalBooking/bookingOptionsPage.vue";
import bookingSpecialtiesPage from "@/pages/medicalBooking/bookingSpecialtiesPage.vue";
import specitaltiesComponent from "@/components/BookingSpecialtiesComponents/specitaltiesComponent.vue";
import BookingWithDoctorPage from "@/pages/medicalBooking/bookingWithDoctorPage.vue";
import ChooseMedicalRecord from "@/components/BookingDoctorComponents/chooseMedicalRecord.vue";
import UpdateUserInfo from "@/pages/user/updateUserInfo.vue";
const routes = [
  {
    path: "/",
    name: "userDashboard",
    component: testLayout,
    meta: { requiresAuth: true, allowedRoles: ["user"] },
    children: [
      {
        path: "",
        name: "menuServicesItems",
        component: serviceMenuItems,
      },
      {
        path: "dat-kham-benh",
        name: "bookingPage",
        component: bookingOptionsPage,
      },
      {
        path: "dat-kham-benh/dat-kham-benh-theo-chuyen-khoa",
        name: "bookingSpecialtiesPage",
        component: bookingSpecialtiesPage,
      },
      {
        path: "dat-kham-benh/dat-kham-benh-theo-chuyen-khoa/chon-bac-si/:specialtyID/:hospitalID",
        name: "bookingWithDoctor",
        component: BookingWithDoctorPage,
        children: [
          {
            path: ":doctorID",
            name: "bookingDateTime",
            component: () =>
              import(
                "@/components/BookingDoctorComponents/bookingDatePicker.vue"
              ),
          },
        ],
      },
      {
        path: "chon-ho-so",
        name: "chooseMedicalRecord",
        component: ChooseMedicalRecord,
      },
      {
        path: "cap-nhat-thong-tin",
        name: "updateUserInfo",
        component: UpdateUserInfo,
      },
    ],
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
      {
        path: "dat-kham-benh",
        name: "dat-kham-benh",
        component: () =>
          import("@/pages/medicalBooking/bookingOptionsPage.vue"),
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
