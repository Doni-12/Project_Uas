const admin = require("firebase-admin");

let serviceAccount;

// Ambil credential dari Railway atau file lokal
if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

  // Perbaiki format private key
  serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, "\n");
} else {
  serviceAccount = require("../serviceAccountKey.json");
}

// Debug credential
console.log("Firebase Project:", serviceAccount.project_id);
console.log("Firebase Email:", serviceAccount.client_email);
console.log("Has Private Key:", !!serviceAccount.private_key);

// Inisialisasi Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Firestore instance
const db = admin.firestore();

// Test koneksi Firestore
(async () => {
  try {
    const test = await db.collection("users").limit(1).get();
    console.log("Firestore connected:", test.size);
  } catch (err) {
    console.error("Firestore connection failed:", err.message);
  }
})();

module.exports = db;