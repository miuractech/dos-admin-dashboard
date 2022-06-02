import * as functions from "firebase-functions";
import * as admin from "firebase-admin";


admin.initializeApp();

export const send = functions.auth.user().onCreate(async (user) => {
  if (!user.disabled && user.email) {
    // const targetUser = user as User
    console.log(user.email);
    await admin.auth().generateEmailVerificationLink(user?.email);
    return admin.firestore().doc(`reSellers/${user.uid}`).set({
      email: user.email,
      accountCreation: user.metadata.creationTime,
    });
  }
  return;
});

