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

let buses=[];
const firestore = getFirestore();
const busDriverCollection = collection(firestore, 'bus_driver');
const driverDetDocument = doc(busDriverCollection, 'driver_det');
const stopsCollectionRef = collection(driverDetDocument, 'stops');

// Function to read data from Firestore.
async function readDataFromFirestore() {
  try {
    // Query all documents within the "stops" subcollection.
    const querySnapshot = await getDocs(stopsCollectionRef);

    // Loop through the documents and access their data.
    querySnapshot.forEach((docSnapshot) => {
      const stopData = docSnapshot.data();
      buses.push(stopData); // Add each bus stop data to the 'buses' array.
    });

    // After populating 'buses' array, you can now proceed to handle the click event.
    handleBusLinksClick();
  } catch (error) {
    console.error("Error reading data from Firestore:", error);
  }
}

// Function to handle the click event on bus links.
function handleBusLinksClick() {
  const busLinks = document.querySelectorAll(".dropdown-content a");
  const infoDiv = document.querySelector(".info");

  busLinks.forEach((link, index) => {
    link.addEventListener("click", () => {
      const bus = buses[index - 1];

      if (bus) {
        let currLocationCapacity = 0;
        for (const stop of bus.stops) {
          if (stop.location === bus.currLocation) {
            currLocationCapacity += stop.students;
            break;
          }
          currLocationCapacity += stop.students;
        }

        let infoHTML = `
          <h1>${bus.name}</h1>
          <p class="js-details"><strong>Driver Id:</strong> ${bus.Did}</p>
          <p class="js-details"><strong>Driver:</strong> ${bus.driver}</p>
          <p class="js-details"><strong>Contact:</strong> ${bus.contact}</p>
          <p class="js-details"><strong>Current Location:</strong> ${bus.currLocation}</p>
          <p class="js-details"><strong>Current Capacity:</strong> ${currLocationCapacity}</p>
        `;

        infoDiv.innerHTML = infoHTML;
      }
    });
  });
}

// Call the function to read the data from Firestore and populate the 'buses' array.
readDataFromFirestore();

/*
function writeStops(){
  buses = [
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
}

writeStops();
*/
