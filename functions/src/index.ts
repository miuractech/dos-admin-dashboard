import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as http from "http";
import * as express from "express";
import * as cors from "cors";
import fetch from "node-fetch";
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

// /
export const api = functions.region("us-central1").runWith(runTimeOption).https.onRequest(app);
// export const checkIpaddress = functions.https.onRequest(async()) => {
//   try {
//     const address = await fetchUrl("api.ipify.org");
//     console.log(address);
//     return address;
//   } catch (error) {
//     console.log(error);
//     return error;
//   }
// });


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

app.post("/pan", async (req, res) => {
  const url = "https://sandbox.cashfree.com/verification/pan";
  const options = {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "x-client-id": "CF182083CBFEIHI4FIP7LR03HO8G",
      "x-client-secret": "3a10249c0fcf35256007b960fa5abf8d03d9dc49",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req.body),
  };
  console.log(req.body);
  fetch(url, options)
      .then((res) => res.json())
      .then((json) => {
        res.send({data: json});
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
