import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as http from "http";
import * as express from "express";
import * as cors from "cors";
import fetch from "node-fetch";
import axios from "axios";
import * as crypto from "crypto";
import * as fs from "fs";
const app = express();
app.use(cors({origin: true}));
admin.initializeApp();

// /
const runTimeOption: {
  vpcConnector: string;
  vpcConnectorEgressSettings: "ALL_TRAFFIC" | "VPC_CONNECTOR_EGRESS_SETTINGS_UNSPECIFIED" | "PRIVATE_RANGES_ONLY" | undefined;
} = {
  vpcConnector: "functions-connector", // ---> name of the serverless vpc connector
  vpcConnectorEgressSettings: "ALL_TRAFFIC",
};


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


export const orderCreate = functions.region("asia-south1").firestore.document("cart/{userId}").onCreate(async (snap, context) => {
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

export const orderUpdate = functions.region("asia-south1").firestore.document("cart/{userId}").onUpdate(async (snap, context) => {
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

export const api = functions.region("us-central1").runWith(runTimeOption).https.onRequest(app);

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
  const unix = new Date().getTime();
  const data = unix + "." + "CF182083CBIGGFQUF4T8G302KPQ0";
  const publicKey = fs.readFileSync(`${__dirname}\\key.pem`, {encoding: "utf8"});
  const encryptedData = crypto.publicEncrypt(
      // {
      publicKey,
      // padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      // oaepHash: "sha256",
      // },
      Buffer.from(data)
  );
  const signature = encryptedData.toString("base64");
  console.log("encypted data: ", encryptedData.toString("base64"));
  console.log("unix: ", unix);
  console.log("publicKey: ", publicKey);
  console.log("data", data);
  const url = "https://sandbox.cashfree.com/verification/pan";
  const options = {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "x-client-id": "CF182083CBIGGFQUF4T8G302KPQ0",
      "x-client-secret": "13fe675c4e0db3d7f4d6a1d89a9a0d8a406a8594",
      "Content-Type": "application/json",
      "x-cf-signature": signature,
    },
    body: JSON.stringify(req.body),
  };
  fetch(url, options)
      .then((res) => res.json())
      .then((json) => {
        res.send({data: json});
        console.log(JSON.parse(json));
      })
      .catch((err) => console.error("error:" + err));
});

app.post("/bank", async (req, res) => {
  try {
    const url = "https://payout-gamma.cashfree.com/payout/v1/authorize";
    const options = {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "x-client-id": "CF182083CBFEIHI4FIP7LR03HO8G",
        "x-client-secret": "3a10249c0fcf35256007b960fa5abf8d03d9dc49",
      },
    };
    const authRes = await fetch(url, options);
    const authjson = await authRes.json();
    const token = authjson.data.token;
    console.log(token);
    const verifyUrl = "https://payout-gamma.cashfree.com/payout/v1/verifyToken";
    const verifyOptions = {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Authorization": token,
      },
    };

    const verifyRes = await fetch(verifyUrl, verifyOptions);
    const verifyJson = await verifyRes.json();
    const verifyToken = verifyJson;
    console.log(verifyToken);
    res.send(verifyToken);
  //   res.json(verifyJson);
  // const url1 = "https://payout-gamma.cashfree.com/payout/v1/validation/bankDetails?bankAccount=026291800001191&ifsc=YESB0000262";
  // const options2 = {
  //   method: "GET",
  //   headers: {"Accept": "application/json", "Authorization": token, "Content-Type": "application/json"},
  // };
  // console.log("Token", token);
  // await fetch(url1, options2)
  //     .then((res) => res.json())
  //     .then((json) => {
  //       console.log(json);
  //       res.send({data: json});
  //     })
  //     .catch((err) => console.error("error:" + err));
  } catch (error) {
    console.log(error);
  }
});

export const pincode = functions.region("asia-south1").https.onCall(async (data, context) => {
  return new Promise((resolve, reject) => {
    const config = {
      method: "get",
      url: `https://apiv2.shiprocket.in/v1/external/courier/serviceability/?pickup_postcode=560034&delivery_postcode=${data.pincode}&cod=1&weight=0.5`,
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjI5MDI4NTcsImlzcyI6Imh0dHBzOi8vYXBpdjIuc2hpcHJvY2tldC5pbi92MS9leHRlcm5hbC9hdXRoL2xvZ2luIiwiaWF0IjoxNjYwMTk3MDU5LCJleHAiOjE2NjEwNjEwNTksIm5iZiI6MTY2MDE5NzA1OSwianRpIjoiNTU3UVFuODRvTGdCaGNkVCJ9.WAVgLcYjPFbm7rGv5Ur8sbJW3pqFd2jSNc_t0LIEzbA",
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
  // resellers.foreach(async (seller: string) =>
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


