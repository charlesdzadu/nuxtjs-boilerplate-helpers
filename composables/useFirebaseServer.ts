import { cert, getApps, initializeApp } from "firebase-admin/app";

import serviceAccountKey from "./firebase_service_accounts.json" with { type: "json" };
export default function useFirebaseServer() {
  let app;
  if (!getApps().length) {
    app = initializeApp({
      credential: cert(serviceAccountKey as any),
    });
  }

  return { app };
}
