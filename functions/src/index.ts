import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as cfsdk from "cashfree-sdk";
import axios = require("axios");
import crypto = require("crypto");
import fs = require("fs");
// import * as timestam from "unix-timestamp";

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
      ClientID: "CF182083CBEPHHUJ5FIO1RSL5HCG",
      ClientSecret: "9d8a0a1e9181949c939d09368885394710b54bb3",
      ENV: "TEST",
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
  const publickey = fs.readFileSync(`${__dirname}\\key.pem`, "utf-8");
  // console.log(publickey);


  const signature = generateCertificate(publickey, "CF182083CBEPHHUJ5FIO1RSL5HCG");
  console.log(signature);

  const options = {
    method: "POST",
    url: "https://sandbox.cashfree.com/verification/pan",
    headers: {
      // "Accept": "application/json",
      "X-Client-Id": "CF182083CBEPHHUJ5FIO1RSL5HCG",
      "X-Client-Secret": "9d8a0a1e9181949c939d09368885394710b54bb3",
      "X-Cf-Signature": signature,
      "Content-Type": "application/json",
    },
    data: {pan: "ABCPV1234D"},
  };
  try {
    const response = await axios.default.request(options);
    console.log("success");
    console.log(response);
    return response;
  } catch (error:any) {
    console.error("error", error.response.data);
    return error;
  }
});

const getCurrentTimeInSecs = () => Math.floor(Date.now() /1000);

const generateCertificate = (publickey: string, clientId: string) => {
  const curTimeStamp = getCurrentTimeInSecs();
  // console.log(timestam.now());
  const plainText = `$${curTimeStamp}.${clientId}`;
  const buffer = Buffer.from(plainText);

  const encrypted = crypto.publicEncrypt(
      {
        key: publickey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      },
      buffer,
  );
  return encrypted.toString("base64");
};
