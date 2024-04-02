import { getAuth } from "firebase-admin/auth";
import useFirebaseServer from "~/composables/useFirebaseServer";

export default defineEventHandler(async (event) => {

  const { app } = useFirebaseServer();

  const { token } = await readBody(event);

  const expiresIn = 60 * 60 * 24 * 5 * 1000;

  try {
    const sessionCookie = await getAuth(app).createSessionCookie(token, {
      expiresIn,
    });
    const options = {
      maxAge: expiresIn,
      httpOnly: true,
      secure: true,
      sameSite: "none",
    } as const;

    console.log("cookie setting...");
    setCookie(event, "session", sessionCookie);

    console.log("cookie set");

    return {
      status: 200,
      body: JSON.stringify({ status: "success" }),
    };
  } catch (error) {
    return {
      status: 401,
      error: "UNAUTHORIZED",
      message: "Failed to create a session cookie" + error,
    };
  }

});
