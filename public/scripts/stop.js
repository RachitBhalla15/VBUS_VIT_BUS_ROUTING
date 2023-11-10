import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  collection,
  updateDoc
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

// Create a reference to the "bus_driver" collection
const busStopsCollection = collection(db, "bus_driver");

let buses = [
  {
    name: "Bus 1",
    driver: "name1",
    contact: "1234567890",
    currLocation: "Stop 2",
    capacity: 0,
    stops: [
      { location: "Kelambakkam", students: 10 },
      { location: "Stop 2", students: 5 },
      { location: "Stop 3", students: 15 },
      { location: "Stop 4", students: 8 },
      { location: "Stop 5", students: 12 }
    ]
  },
  {
    name: "Bus 2",
    driver: "name2",
    contact: "9876543210",
    currLocation: "Stop 5",
    capacity: 0,
    stops: [
      { location: "Menambakkam", students: 8 },
      { location: "Stop 2", students: 10 },
      { location: "Stop 3", students: 6 },
      { location: "Stop 4", students: 5 },
      { location: "Stop 5", students: 4 }
    ]
  },
  {
    name: "Bus 3",
    driver: "name3",
    contact: "5555555555",
    currLocation: "Kancheepuram",
    capacity: 0,
    stops: [
      { location: "Kancheepuram", students: 15 },
      { location: "Stop 2", students: 8 },
      { location: "Stop 3", students: 2 },
      { location: "Stop 4", students: 3 },
      { location: "Stop 5", students: 1 }
    ]
  }
];

async function writeStops() {
  // Initialize the buses array code here...
  for (const bus of buses) {
    // Create a reference to the individual bus document using the bus name
    const busDocRef = doc(busStopsCollection, bus.name);

    // Update the document with bus information
    await updateDoc(busDocRef, {
      driver: bus.driver,
      contact: bus.contact,
      currLocation: bus.currLocation,
      capacity: bus.capacity,
      stops: bus.stops
    });
  }
}

// Call the writeStops function to update Firestore
writeStops();

// MADE BY:-
// NATANYA MODI :: https://github.com/natanyamodi
// RACHIT BHALLA :: https://github.com/RachitBhalla15