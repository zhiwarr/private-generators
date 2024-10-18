import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
// import { registerSW } from "virtual:pwa-register";
import PrimeVue from "primevue/config";

import "./assets/base.css";
import "./assets/main.css";

// registerSW({ immediate: true });
const app = createApp(App);
app.use(PrimeVue);

app.use(createPinia());
app.use(router);
app.mount("#app");
