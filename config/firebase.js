const { initializeApp, cert } = require("firebase-admin/app")
const { getFirestore } = require("firebase-admin/firestore")
const { getAuth } = require("firebase-admin/auth")
const { getMessaging } = require("firebase-admin/messaging")

const serviceAccount = require("../serviceAccountKey.json")

const app = initializeApp({
    credential: cert(serviceAccount)
})

const db = getFirestore(app)
const auth = getAuth(app)
const messaging = getMessaging(app)

module.exports = {
    db,
    auth,
    messaging
}
