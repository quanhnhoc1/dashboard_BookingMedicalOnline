import { createApp } from "vue";
import "./assets/main.css";
import App from "./App.vue";
import router from "./router/index.js";
import "@flaticon/flaticon-uicons/css/all/all.css";

const app = createApp(App);
app.use(router);
app.mount("#app");
