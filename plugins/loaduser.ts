import { useAuthStore } from "~/stores/auth";

export default defineNuxtPlugin(async (app) => {
	const session = useCookie("session").value as string;

	if (!session) {
		console.log("No session cookie found");
		return;
	}
	const auth = useAuthStore();

	if (auth.isAuthenticated == false) {
		await auth.initializeUser();
	}
});
