import { createApp } from "vue";
import "./assets/main.css";
import App from "./App.vue";
import router from "./router/index.js";
import { createPinia } from "pinia";
import "@flaticon/flaticon-uicons/css/all/all.css";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import vue3GoogleLogin from "vue3-google-login";

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

// Cấu hình Google OAuth
app.use(vue3GoogleLogin, {
  clientId:
    "419237871729-6cv0dkr0tqeqhtmgd734t0srv2vc0mp9.apps.googleusercontent.com",
});

app.use(router);
app.use(pinia);
app.mount("#app");
