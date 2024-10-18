import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const Login = () => import("@/views/LoginForm.vue");
const Home = () => import("@/views/Home.vue");
const Users = () => import("@/views/Users.vue");
const Admins = () => import("@/views/Admins.vue");
const Invoices = () => import("@/views/Invoices.vue");
const PrintInvoices = () => import("@/views/PrintInvoices.vue");
const routes = [
  {
    name: "login",
    path: "/",
    component: Login,
    meta: { requiresAuth: false },
  },
  {
    name: "dashboard",
    path: "/dashboard",
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    name: "users",
    path: "/users",
    component: Users,
    meta: { requiresAuth: true },
  },
  {
    name: "admins",
    path: "/admins",
    component: Admins,
    meta: { requiresAuth: true },
  },
  {
    name: "invoices",
    path: "/invoices",
    component: Invoices,
    meta: { requiresAuth: true },
  },
  {
    path: "/print-invoices/:id",
    name: "print-invoices",
    component: PrintInvoices,
    meta: { requiresAuth: true },
  },

  {
    path: "/:catchAll(.*)*",
    redirect: { name: "home" },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkExactActiveClass: "text-yellow-500",
});

router.beforeEach((to, from, next) => {
  const store = useAuthStore();

  if (to.meta.requiresAuth && !store.isLoggedIn) {
    next("/"); // Redirect to  if not logged in
  } else if (to.path === "/" && store.isLoggedIn) {
    next("/admin/dashboard"); // Redirect to dashboard if already logged in
  } else {
    next(); // Proceed to the route
  }
});

export default router;
