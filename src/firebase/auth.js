import { fireBaseAuth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updatePassword,
  setPersistence,
  inMemoryPersistence,
} from "firebase/auth";

const setAuthPersistence = () => {
  setPersistence(fireBaseAuth, inMemoryPersistence);
};

export const doCreateUserWithEmailAndPassword = async (email, password) => {
  setAuthPersistence();
  return createUserWithEmailAndPassword(fireBaseAuth, email, password);
};

export const doSignInWithEmailAndPassword = async (email, password) => {
  setAuthPersistence();
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
