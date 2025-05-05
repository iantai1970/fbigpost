import { fireBaseAuth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updatePassword,
} from "firebase/auth";

export const doCreateUserWithEmailAndPassword = async (email, password) => {
  return createUserWithEmailAndPassword(fireBaseAuth, email, password);
};

export const doSignInWithEmailAndPassword = async (email, password) => {
  return signInWithEmailAndPassword(fireBaseAuth, email, password);
};

export const doSignOut = () => {
  return fireBaseAuth.signOut();
};

export const doPasswordReset = (email) => {
  return sendPasswordResetEmail(fireBaseAuth, email);
};

export const doPasswordChange = (password) => {
  return updatePassword(fireBaseAuth.currentUser, password);
};

export const doSendEmailVerification = () => {
  return sendEmailVerification(fireBaseAuth.currentUser, {
    url: `windows.location.origin}/home`,
  });
};
