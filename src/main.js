import { createApp } from "vue";
import "./assets/main.css";
import App from "./App.vue";
import router from "./router/index.js";
import { createPinia } from "pinia";
import "@flaticon/flaticon-uicons/css/all/all.css";

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);
app.mount("#app");
