import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as http from "http";
import * as express from "express";
import * as cors from "cors";
import fetch from "node-fetch";
import axios from "axios";
import * as crypto from "crypto";
import * as fs from "fs";
import * as cfSdk from "cashfree-sdk";
const app = express();
app.use(cors({origin: true}));
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
        return admin.firestore().doc(`uploads/${uid}/images/${fileName}`).set({
          createdAt: object.timeCreated,
          path: object.name,
          size: object.size,
          url,
        });
      }
      return;
    });


export const orderCreate = functions.region("asia-south1").firestore.document("cart/{userId}").onCreate(async (snap) => {
  const newValue = snap.data();
  const res = await admin.firestore().collection("orders").add({
    ...newValue,
    userId: snap.id,
    orderStatus: "created",
  });
  await admin.firestore().collection("orders").doc(res.id).update({
    orderid: res.id,
  });
  await admin.firestore().collection("cart").doc(snap.id).update({
    orderid: res.id,
  });
  return;
});

export const orderUpdate = functions.region("asia-south1").firestore.document("cart/{userId}").onUpdate(async (snap) => {
  const after = snap.after.data();
  const items = after.items;
  let total = 0;
  for (const item of items) {
    if (item.resellerId) {
      const res = admin.firestore().collection("reSellers").doc(item.resellerId).collection("products").doc(item.productID);
      const doc = await res.get();
      const data = doc.data();
      if (data) {
        total = total + (item.count * data.price);
      }
    } else if (item.userId) {
      const res = admin.firestore().collection("users").doc(item.userId).collection("products").doc(item.productID);
      const doc = await res.get();
      const data = doc.data();
      if (data) {
        total = total + (item.count * data.price);
      }
    }
  }
  await admin.firestore().collection("orders").doc(after.orderid).update({
    ...after,
    total,
  });
  return;
});

export const api = functions.region("asia-south1").https.onRequest(app);

const fetchUrl = async (url: string) => {
  return new Promise((resolve, reject) => {
    const request = http.get({host: url, port: 80, path: "/"}, (res: any) => {
      if (res.statusCode < 200 || res.statusCode > 299) {
        return reject(new Error(`HTTP status code ${res.statusCode}`));
      }

      const body: any = [];
      res.on("data", (chunk: any) => body.push(chunk));
      res.on("end", () => {
        const resString = Buffer.concat(body).toString();
        resolve(resString);
      });
    });

    request.on("error", (err) => {
      reject(err);
    });
    request.on("timeout", () => {
      request.destroy();
      reject(new Error("timed out"));
    });
  });
};

app.get("/ipaddress", async (req, res) => {
  const address = await fetchUrl("api.ipify.org");
  res.send({data: address});
});

app.post("/successTest", (req, res) => {
  res.redirect("dos.com/payment/success/{}");
  return;
});


app.post("/pan", async (req, res) => {
  const unix = Math.round((new Date()).getTime() / 1000);
  const data =`CF182083CC4JME2P52PFAQQB6Q00.${unix}`;
  const publicKey = fs.readFileSync(`${__dirname}/key.pem`, {encoding: "utf8"});
  const encryptedData = crypto.publicEncrypt(
      {
        key: publicKey,
      },
      Buffer.from(data)
  );
  const signature = encryptedData.toString("base64");
  const url = "https://sandbox.cashfree.com/verification/pan";
  const options = {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "x-client-id": "CF182083CC4JME2P52PFAQQB6Q00",
      "x-client-secret": "8c00e632bbd529cde23330cfc29f09783a0b29c6",
      "Content-Type": "application/json",
      "x-cf-signature": signature,
    },
    body: req.body,
  };
  fetch(url, options)
      .then((res) => res.text())
      .then((json) => {
        res.send({data: json});
        console.log(json);
      })
      .catch((err) => console.error("error:" + err));
});

app.post("/bank", async (req, res) => {
  try {
    const publicKey = fs.readFileSync(`${__dirname}/key.pem`, {encoding: "utf8"});
    const {Payouts} = cfSdk;
    const {Validation} = Payouts;
    const config = {
      Payouts: {
        ClientID: "CF182083CC4JME2P52PFAQQB6Q00",
        ClientSecret: "8c00e632bbd529cde23330cfc29f09783a0b29c6",
        PublicKey: publicKey,
        ENV: "TEST",
      },
    };
    Payouts.Init(config.Payouts);
    const data = JSON.parse(req.body);
    const response = await Validation.ValidateBankDetails(data);
    console.log("bank validation response");
    console.log(response);
    res.send(response);
  } catch (err) {
    console.log("err caught in bank validation");
    console.log(err);
    res.send(err);
  }
});

export const pincode = functions.region("asia-south1").https.onCall(async (data) => {
  return new Promise((resolve, reject) => {
    const config = {
      method: "GET",
      url: `https://apiv2.shiprocket.in/v1/external/courier/serviceability/?pickup_postcode=560034&delivery_postcode=${data.pincode}&cod=1&weight=0.5`,
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjI5MzYxNTUsImlzcyI6Imh0dHBzOi8vYXBpdjIuc2hpcHJvY2tldC5pbi92MS9leHRlcm5hbC9hdXRoL2xvZ2luIiwiaWF0IjoxNjYxNTM0NzA1LCJleHAiOjE2NjIzOTg3MDUsIm5iZiI6MTY2MTUzNDcwNSwianRpIjoiZ2RRZXNIQ2VQSG9XQmxXbSJ9.vVb6XtGGIO0G82D7UxllocQl-CwNg01jUbrnIsjs1mM",
      },
    };
    return axios(config)
        .then(function(response) {
          resolve(response.data);
          console.log(response.data);
        })
        .catch(function(error) {
          reject(error);
          console.log(error);
        });
  });
});

app.post("/success", async (req, res) => {
  const data = req.body;
  const {status, mode, amount, txnid} = data;
  await admin.firestore().collection("orders").doc(txnid).update({
    orderStatus: "paymentCompleted",
    paid: amount,
    mode: mode,
    status: status,
  });
  const result = await admin.firestore().collection("orders").doc(txnid).get();
  const orderdata = result.data();
  if (!orderdata) return;
  admin.firestore().collection("cart").doc(orderdata.userId).delete();
  const Resellerdata = orderdata.items.map((order: { resellerId: string; }) => order.resellerId);
  const resellers = [...new Set(Resellerdata)] as string[];
  if (resellers.length > 0) {
    for (const seller of resellers) {
      if (!seller) {
        continue;
      }
      const filterProducts = orderdata.items.filter((pro: any) => pro.resellerId === seller);
      let baseTotal = 0;
      let priceTotal = 0;
      for (const product of filterProducts) {
        const res = admin.firestore().collection("reSellers").doc(product.resellerId).collection("products").doc(product.productID);
        const doc = await res.get();
        const data = doc.data();
        if (data) {
          baseTotal = baseTotal + data.basePrice * product.count;
          priceTotal = priceTotal + data.price * product.count;
        }
      }
      await admin.firestore().collection("reSellers").doc(seller).collection("orders").add({
        ...orderdata,
        items: filterProducts,
        profit: priceTotal - baseTotal,
      });
    }
    res.redirect("https://dos-website.web.app//success");
  }
  const orderData = admin.firestore().collection("orders").where("userId", "==", orderdata.userId).where("status", "==", "success");
  const docs = await orderData.get();
  await admin.firestore().collection("users").doc(orderdata.userId).collection("Count").doc("orderCount").set({
    count: docs.docs.length,
  });
  res.redirect("https://dos-website.web.app//success");
});

app.post("/failure", async (req, res) => {
  const data = req.body;
  const {status, mode, txnid} = data;
  admin.firestore().collection("orders").doc(txnid).update({
    orderStatus: "paymentFailed",
    status: status,
    mode: mode,
  });
  res.redirect("https://dos-website.web.app//failure");
});


