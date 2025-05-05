import { doSignOut } from "../../firebase/auth.js";

export async function SignOutAndReturn(navigate) {
  try {
    // Perform the sign-out operation
    await doSignOut();
    console.log(`logout success`);
    navigate("/UserLogin", { replace: true });
  } catch (error) {
    console.error("Error signing out:", error);
  }
}
