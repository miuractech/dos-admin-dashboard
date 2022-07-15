import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
// import { publicIpv4 } from 'public-ip';
// import fetch from "node-fetch"
const cfSdk = require('cashfree-sdk');
// import * as crosModule from "cors"
admin.initializeApp();

// const cros = crosModule({ origin: true })

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

export const bank = functions.https.onCall(async (data, context) => {
  console.log("data");
  // console.log(await publicIpv4());
  const { Payouts } = cfSdk;
  const { Validation } = Payouts;
  const config = {
    Payouts: {
      ClientID: "CF182083CB7T3VT6LA0396U1BP90",
      ClientSecret: "a186e2ecb92a9b038ef2b168f697e362e0ba2067",
      ENV: "TEST",
    }
  };
  Payouts.Init(config.Payouts);
  //bank validation
  try {
    const response = await Validation.ValidateBankDetails({
      // name: "",
      // phone: "",
      bankAccount: "026291800001191",
      ifsc: "YESB0000262"
    });
    console.log("bank validation response");
    console.log(response);
    return response
  }
  catch (err) {
    console.log("err caught in bank validation");
    console.log(err);
    return err
  }
})