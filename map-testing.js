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



const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

var map;



async function initMap1() {
  const querySnapshot = await getDocs(collection(doc(db, "buses", "stops"), "Aditya Bhai sexy"));

  let location_array = [];
  class LocationData {
    constructor(latitude, longitude, serial) {
      this.latitude = latitude;
      this.longitude = longitude;
      this.serial = serial;
    }
  }

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

  // Create a polyline for the route
  var coordinates = location_array.map(function (location) {
    return { lat: location.latitude, lng: location.longitude};
  });

  var routePolyline = new mappls.Polyline({
    map: map,
    path: coordinates,
    strokeColor: "#000000",
    strokeOpacity: 1.0,
    strokeWeight: 10,
  });
}
