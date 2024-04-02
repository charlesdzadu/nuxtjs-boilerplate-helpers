import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import firebaseConfig from "~/firebase_auth_config.json";

export default defineNuxtPlugin((nuxtApp) => {
  const firebaseApp = initializeApp(firebaseConfig);

  const auth = getAuth(firebaseApp);

  return {
    provide: {
      auth: auth,
    },
  };
});
