import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  collection,
} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB1zdPdHi6njKUgiukk-84RVPEzOJFcAxc",
  authDomain: "vit-bus-tracking.firebaseapp.com",
  databaseURL: "https://vit-bus-tracking-default-rtdb.firebaseio.com",
  projectId: "vit-bus-tracking",
  storageBucket: "vit-bus-tracking.appspot.com",
  messagingSenderId: "832936720267",
  appId: "1:832936720267:web:4f170bd4652b5ae10d618e",
  measurementId: "G-5L7PE5VHHX",
};

class LocationData {
  constructor(latitude, longitude, serial) {
    this.latitude = latitude;
    this.longitude = longitude;
    this.serial = serial;
  }
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const querySnapshot = await getDocs(
  collection(db, "buses", "routes", "Aditya Bhai sexy")
);

let location_array = [];

querySnapshot.forEach((doc) => {
  location_array.push(
    new LocationData(
      doc.data().latitude,
      doc.data().longitude,
      doc.data().serial
    )
  );
});

location_array.sort(function (a, b) {
  if (a.serial < b.serial) return -1;
  else return 1;
});

export default location_array;
