import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDihQBwDWxC1EUIXpiEs-UTp92j0TXNinU",
  authDomain: "catch-of-the-day-main.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-main.firebaseio.com"
});
const base = Rebase.createClass(firebaseApp.database());
export { firebaseApp };
export default base;
