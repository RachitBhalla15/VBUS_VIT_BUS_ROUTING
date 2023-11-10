/*let maxCapacity = 50; 
let busLinks = document.querySelectorAll('.dropdown-content a'); 
let buses = []; 
for (let i = 0; i < busLinks.length; i++) {
  buses.push(busLinks[i].textContent); 
}

function checkAvailability(studentName, regNo, location) {

  let busNo = document.getElementById('search-input').value; 
  let locationIndex = buses.indexOf('Bus ' + busNo); 
  let studentLocation = location.toLowerCase(); 

  if (locationIndex !== -1 && studentLocation === buses[locationIndex].toLowerCase()) {
  
    if (maxCapacity > 0) {
      maxCapacity--;
      let message = studentName + ' (' + regNo + ') can take Bus ' + busNo + ', new capacity is ' + maxCapacity + '.';
      let messageBox = document.getElementById('message-box');
      messageBox.textContent = message;
      messageBox.style.display = 'block';

      setTimeout(function() {
        messageBox.style.display = 'none';
      }, 2000);
    } else {
      let message = 'Sorry, Bus ' + busNo + ' is already full.';
      let messageBox = document.getElementById('message-box');
      messageBox.textContent = message;
      messageBox.style.display = 'block';

      setTimeout(function() {
        messageBox.style.display = 'none';
      }, 2000);
    }
  } else {
    let message = 'Sorry, Bus ' + busNo + ' is not available at your location.';
    let messageBox = document.getElementById('message-box');
    messageBox.textContent = message;
    messageBox.style.display = 'block';

    setTimeout(function() {
      messageBox.style.display = 'none';
    }, 2000); 
  }
}
*/
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  collection,
  deleteDoc
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

  } catch (error) {
    console.error("Error reading data from Firestore:", error);
  }
}

readDataFromFirestore();

let maxCapacity = 30;

async function readStudentDataFromFirestore() {
  try {
    // Query all documents within the "requests" collection
    const querySnapshot = await getDocs(collection(db, 'requests'));

    // Loop through the documents and access their data
    const studentsContainer = document.querySelector('.students-container');

    querySnapshot.forEach((docSnapshot) => {
      const studentData = docSnapshot.data();
      const studentDetails = `
        <div class="requests-window">
          <div class="detail-container">
            <div class="detail">
              <div class="name">${studentData.studentName}</div>
              <div class="regno">${studentData.regNo}</div>
              <div class="bus-no">${studentData.busNo}</div>
              <div class="location">${studentData.location}</div>
            </div>
            <div class="check-capacity"
                data-studentname="${studentData.studentName}"
                data-regno="${studentData.regNo}"
                data-location="${studentData.location}"
                data-requestid="${docSnapshot.id}"> <!-- Add requestId as a data attribute -->
              Check Availability
            </div>
          </div>
        </div>
      `;


      studentsContainer.insertAdjacentHTML('beforeend', studentDetails);

    });

  } catch (error) {
    console.error("Error reading student data from Firestore:", error);
  }
}

// Attach event listeners


// Call the functions to read data and attach event listeners
try {
  document.addEventListener("DOMContentLoaded", () => {
    readStudentDataFromFirestore();
  });
} catch (error) {
  console.error("Error fetching Firestore data:", error);
}

document.querySelector('.students-container').addEventListener('click', async (event) => {
  if (event.target.classList.contains('check-capacity')) {
    const studentName = event.target.dataset.studentname;
    const regNo = event.target.dataset.regno;
    const location = event.target.dataset.location;
   
    
    // Debugging statements
    console.log("Clicked button:", event.target);
    console.log("studentName:", studentName);
    console.log("regNo:", regNo);

    // Delete the Firestore document with the specified requestId
    try {
      await deleteDoc(doc(collection(db, 'requests'), requestId));
    } catch (error) {
      console.error("Error deleting Firestore document:", error);
    }    

    // Now, remove the student's request div from the page
    
    
    // Rest of your checkAvailability code...
    checkAvailability(studentName, regNo, location);
  }
});


async function findMatchingBusStop(studentLocation, selectedBus) {
  for (const stop of selectedBus.stops) {
    if (stop.location.toLowerCase() === studentLocation.toLowerCase()) {
      return stop;
    }
  }
  return null;
}

async function checkAvailability(studentName, regNo, location) {
  let studentLocation = location.toLowerCase();
  
  for (const bus of buses) {
    const matchingStop = await findMatchingBusStop(studentLocation, bus);
    
    if (matchingStop && bus.capacity < maxCapacity) {
      bus.capacity++;
      let message = `${studentName} (${regNo}) can take ${bus.name} to ${matchingStop.location}, new capacity is ${bus.capacity}.`;
      let messageBox = document.getElementById('message-box');
      messageBox.innerHTML = message;
      messageBox.style.display = 'block';
      // Remove the student's request div from the page
      const requestDivs = document.querySelectorAll('.requests-window');
      for (const requestDiv of requestDivs) {
        const RegElement = requestDiv.querySelector('.regno');
        if (RegElement && RegElement.textContent === regNo) {
          requestDiv.parentNode.removeChild(requestDiv);
          break;
        }
      }
      const requestId = event.target.dataset.requestid; // Get the requestId// Get the requestId

      // Delete the Firestore document with the specified requestId
    try {
      await deleteDoc(doc(collection(db, 'requests'), requestId));
    } catch (error) {
      console.error("Error deleting Firestore document:", error);
    }    

      setTimeout(function () {
        messageBox.style.display = 'none';
      }, 5000);

      return; 
    }
  }

  // Handle the case where no matching bus stop was found or all buses are full.
  let message = `Sorry, there is no available bus at your location or all buses are full.`;
  let messageBox = document.getElementById('message-box');
  messageBox.innerHTML = message;
  messageBox.style.display = 'block';

  setTimeout(function () {
    messageBox.style.display = 'none';
  }, 5000);
}