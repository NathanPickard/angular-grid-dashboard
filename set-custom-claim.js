var admin = require("firebase-admin");
var uid = process.argv[2];

var serviceAccount = require('./angular-grid-dashboard-firebase-adminsdk-s4y2l-51b1048ad7.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://angular-grid-dashboard.firebaseio.com"
});

admin.auth().setCustomUserClaims(uid, { admin: true})
  .then(() => {
    console.log('custom claims set for user', uid);
    process.exit();
  })
  .catch(error => {
    console.log('error', error);
    process.exit(1);
  });
