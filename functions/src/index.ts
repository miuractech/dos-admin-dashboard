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
    const res= admin.firestore().collection("reSellers").doc(item.resellerId).collection("products").doc(item.productID);
    const doc = await res.get();
    const data = doc.data();
    if (data) {
      total = total + (item.count * data.price);
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
  const data =`CF182083CBIGGFQUF4T8G302KPQ0.${unix}`;
  const publicKey = fs.readFileSync(`${__dirname}\\key.pem`, {encoding: "utf8"});
  const encryptedData = crypto.publicEncrypt(
      {
        key: publicKey,
      },
      Buffer.from(data)
  );
  const signature = encryptedData.toString("base64");
  const url = "https://api.cashfree.com/verification/pan";
  const options = {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "x-client-id": "CF182083CBIGGFQUF4T8G302KPQ0",
      "x-client-secret": "13fe675c4e0db3d7f4d6a1d89a9a0d8a406a8594",
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
    const publicKey = fs.readFileSync(`${__dirname}\\key.pem`, {encoding: "utf8"});
    const {Payouts} = cfSdk;
    const {Validation} = Payouts;
    const config = {
      Payouts: {
        ClientID: "CF182083CBIGGFQUF4T8G302KPQ0",
        ClientSecret: "13fe675c4e0db3d7f4d6a1d89a9a0d8a406a8594",
        PublicKey: publicKey,
        ENV: "PRODUCTION",
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
        "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjI5MDI4NTcsImlzcyI6Imh0dHBzOi8vYXBpdjIuc2hpcHJvY2tldC5pbi92MS9leHRlcm5hbC9hdXRoL2xvZ2luIiwiaWF0IjoxNjYxMjM5MjE5LCJleHAiOjE2NjIxMDMyMTksIm5iZiI6MTY2MTIzOTIxOSwianRpIjoiU1pRRU56UVJCQU5WZHpVVyJ9.XKr48uMFvgR6mvZhM9fpFsBZC5gw_0bgNe-XaSIcStw",
      },
    };
    return axios(config)
        .then(function(response) {
          resolve(response.data);
        })
        .catch(function(error) {
          reject(error);
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
  const resellers = orderdata.items.map((order: { resellerId: string; }) => order.resellerId);
  for (const seller of resellers) {
    const filterProducts = orderdata.items.filter((pro:any) => pro.resellerId === seller);
    await admin.firestore().collection("reSellers").doc(seller).collection("orders").add({
      ...orderdata,
      items: filterProducts,
    });
  }
  res.redirect("http://localhost:4200/success");
});

app.post("/failure", async (req, res) => {
  const data = req.body;
  const {status, mode, txnid} = data;
  admin.firestore().collection("orders").doc(txnid).update({
    orderStatus: "paymentFailed",
    status: status,
    mode: mode,
  });
  res.redirect("http://localhost:4200/failure");
});


