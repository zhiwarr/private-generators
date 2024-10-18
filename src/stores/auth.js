// stores/auth.js
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isLoggedIn: false,
    admin: null, // Store admin data if needed
  }),
  actions: {
    login(admin) {
      this.isLoggedIn = true;
      this.admin = admin; // Store admin data if needed
    },
    logout() {
      this.isLoggedIn = false;
      this.admin = null;
    },
  },
});
