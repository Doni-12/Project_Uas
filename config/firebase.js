const admin = require("firebase-admin");

const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT
  ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
  : require("../serviceAccountKey.json");

// Debug credential
console.log("Firebase Project:", serviceAccount.project_id);
console.log("Firebase Email:", serviceAccount.client_email);
console.log("Has Private Key:", !!serviceAccount.private_key);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = db;