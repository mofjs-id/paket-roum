const functions = require("firebase-functions");
const admin = require("firebase-admin");

const app = admin.initializeApp();

// exports.setProfile = functions.https.onCall(async (data, context) => {
//   const user = await admin.auth().getUser(context.auth.uid);
//   const userDoc = admin.firestore().doc(`/user/${user.phoneNumber}`);
//   await userDoc.update({ data });
// });

exports.getPaket = functions.https.onCall((_, context) => {
  return app
    .auth()
    .getUser(context.auth.uid)
    .then(user =>
      admin
        .firestore()
        .collection("/paket")
        .where("nomorHandphone", "==", user.phoneNumber)
        .get()
    )
    .then(paket => paket.docs.map(snap => snap.data()));
});

// exports.notifyPaket = functions.firestore
//   .document("paket/{paketId}")
//   .onCreate(snap => {
//     const newPaket = snap.data();
//     admin.messaging().send({ data: newPaket, webpush: { notification: {} } });
//   });
