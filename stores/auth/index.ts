import { getAuth, getIdToken, signOut } from "firebase/auth";
import { defineStore } from "pinia";

// Types
import type { User } from "~/models/user";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    user: null as User | null,
    token: null as string | null,
  }),
  getters: {
    isAuthenticated: (state) => {
      if (state.user) {
        return true;
      }
      return false;
    },
  },
  actions: {


    async initializeUser() {
      const config = useRuntimeConfig();
      const url = `${config.public.apiBaseUrl}/accounts/me/`;
      let token = useCookie("session").value;
      if (!token) {
        token = this.token;
      }
	  this.token = token;

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      } as any;

	  console.log("Fetching user", url, headers);

      try {
		const response = await fetch(url, {
			method: "GET",
			headers: headers,
		  });


		  if (!response.ok) {
			console.log("Error fetching user");
			return;
		  }

		  const data = await response.json();
		  this.user = data;
	  } catch (error) {
		console.log(error);
	  }
    },

    async logout() {
      const config = useRuntimeConfig();
      var url = `${config.public.baseUrl}/api/auth/logout`;
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.error) {
            console.log(data.error);
            window.location.href = "/";
            return;
          }

          signOut(getAuth())
            .then(() => {
              this.user = null;
              this.token = null;
              window.location.href = "/";
            })
            .catch((error) => {
              console.log(error);
              window.location.href = "/";
            });
        });
    },
  },
});
