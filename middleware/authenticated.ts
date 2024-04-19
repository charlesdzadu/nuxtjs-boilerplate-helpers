import { useAuthStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore();
  console.log("Checking if user is authenticated");
  if (authStore.isAuthenticated == false) {
    return navigateTo("/");
  }
});
