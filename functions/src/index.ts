import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as cfsdk from "cashfree-sdk";
import fetch from "node-fetch";

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
      if (!object.name) return;
      const path = object.name.split("/");
      if (path[0] === "uploads") {
        await bucket.file(object.name).makePublic();
        const [metadata] = await bucket.file(object.name).getMetadata();
        const url = metadata.mediaLink;
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

export const bank = functions.region("asia-south1").https.onCall(async (data) => {
  const {Payouts} = cfsdk;
  const {Validation} = Payouts;
  const config = {
    Payouts: {
      ClientID: "CF182083CB7T3VT6LA0396U1BP90",
      ClientSecret: "a186e2ecb92a9b038ef2b168f697e362e0ba2067",
      ENV: "TEST",
      PathToPublicKey: "./publickey/key.pem",
    },
  };
  Payouts.Init(config.Payouts);
  try {
    const response = await Validation.ValidateBankDetails({
      name: data.name,
      phone: data.mobileNumber,
      bankAccount: data.accountNumber,
      ifsc: data.ifscCode,
    });
    return response;
  } catch (err) {
    return err;
  }
});

export const pan = functions.region("asia-south1").https.onCall(async (data) => {
  const url = "https://sandbox.cashfree.com/verification";
  const options = {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "x-client-id": "CF182083CB7T3VT6LA0396U1BP90",
      "x-client-secret": "a186e2ecb92a9b038ef2b168f697e362e0ba2067",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({pan: data.panNumber, name: data.name}),
  };
  try {
    const result = await fetch(url, options);
    return result.json();
  } catch (error) {
    return error;
  }
});
