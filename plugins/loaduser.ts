import { useAuthStore } from "~/stores/auth";

export default defineNuxtPlugin(async (app) => {
  const auth = useAuthStore();
  const session = useCookie("session").value as string;
  if (!session) {
    return;
  }
  if (!auth.isAuthenticated) {
    await auth.initializeUser();
  }
});
