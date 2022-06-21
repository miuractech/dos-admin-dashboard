import * as functions from "firebase-functions";
import * as admin from "firebase-admin";


admin.initializeApp();

export const docCreation = functions.region("asia-south1")
  .auth.user().onCreate(async (user) => {
    if (!user.disabled && user.email) {
      await admin.auth().generateEmailVerificationLink(user?.email);
      return admin.firestore().doc(`reSellers/${user.uid}`).set({
        email: user.email,
        accountCreation: user.metadata.creationTime,
      });
    }
    return;
  });

export const createDocstorage = functions.region("asia-south1")
  .storage
  .object().onFinalize(async (object) => {
    const uid = object.name?.split("/")[1];
    const fileName = object.name?.split("/").pop();
    const bucket = admin.storage().bucket(object.bucket);
    if (object.name) {
      await bucket.file(object.name).makePublic();
      const [metadata] = await bucket.file(object.name).getMetadata();
      const url = metadata.mediaLink;
      console.log(url);
      console.log("object", object.name, object.metadata);
      return admin.firestore().doc(`uploads/${uid}/images/${fileName}`).set({
        createdAt: object.timeCreated,
        path: object.name,
        size: object.size,
        url,
      });
    }
    return;
  });

