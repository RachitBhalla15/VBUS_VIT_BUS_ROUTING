// history.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCGRFOEC7ZZS3ovP7kZm2BOga4l0BeUwJ4",
  authDomain: "vit-bus-tracking-firebase.firebaseapp.com",
  projectId: "vit-bus-tracking-firebase",
  storageBucket: "vit-bus-tracking-firebase.appspot.com",
  messagingSenderId: "584803144956",
  appId: "1:584803144956:web:6eba2cb9552e48de333379",
  measurementId: "G-F0R03J9ZZX"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function readDataFromFirestore() {
  try {
    const reRoutingHistoryCollection = collection(db, 'reRoutingHistory');
    const querySnapshot = await getDocs(reRoutingHistoryCollection);
    const studentsContainer = document.querySelector('.students-container');

    querySnapshot.forEach((docSnapshot) => {
      const BusData = docSnapshot.data();
      console.log(BusData)
      if (BusData.emergency === true && BusData.bus_id ) {

        if( BusData.rerouted_bus_id && BusData.rerouted_bus_id.length !== 0){
          let reroutedDetails = '';

        for (let i = 0; i < BusData.rerouted_bus_id.length; i++) {
          reroutedDetails += `
            <div class="re-detail">
              <div class="Hading">Re-Routed Bus ${i + 1}: &nbsp; ${BusData.rerouted_bus_routes
                [i]}</div>
              <div class="bus-num"> Bus Number:${BusData.emergency_bus_numbers[i]}</div>
            </div>
          `;
        }

        const BusDetails = `
          <div class="requests-window">
            <div class="detail-container">
              <div class="detail">
                <div class="Hading-Det">Broken Bus: ${BusData.route_name}</div>
                <div>Broken Bus ID: ${BusData.bus_id}</div>
                <div>Broken Bus Number: ${BusData.bus_number}</div>
                <div>Driver Name: ${BusData.employee_name}</div>
                <div>Driver Phone: ${BusData.phone_number}</div>
              </div>
              <div class="re-detail">
                <div class="Hading">Re-Routed Buses:  &nbsp; YES!</div>
                <br>
                ${reroutedDetails}
              </div>
            </div>
          </div>
        `;
        studentsContainer.insertAdjacentHTML('beforeend', BusDetails);
      }
      // <div> Bus ID: ${BusData.rerouted_bus_id[i]}</div>
      // <div> original RouteId: ${BusData.rerouted_route_id[i]}</div>
      else if ( BusData.rerouted_route_id && BusData.rerouted_route_id.length === 0
        ) {
          const BusDetails = `
            <div class="requests-window">
              <div class="detail-container">
                <div class="detail">
                  <div class="Hading-Det">Broken Bus: ${BusData.route_name}</div>
                  <div>Broken Bus ID: ${BusData.bus_id}</div>
                  <div>Broken Bus Number: ${BusData.bus_number}</div>
                  <div>Driver Name: ${BusData.employee_name}</div>
                  <div>Driver Phone: ${BusData.phone_number}</div>
                </div>
                <div class="re-detail">
                  <div class="no-Hading">Re-Routed Buses:  &nbsp; NO!!!</div>
                  <div  style="color: aquamarine; font-size: 35px; font-weight: bold;">Handled by contacting the driver personally.</div>
                </div>
              </div>
            </div>
          `;
          studentsContainer.insertAdjacentHTML('beforeend', BusDetails);
        }
      }
    });
  } catch (error) {
    console.error("Error reading data from Firestore:", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  readDataFromFirestore();
});

document.querySelector('.requests-tab').addEventListener('click', () => {
  window.location.href = 'request.html'; // Redirect to history.html
});

// MADE BY:-
// NATANYA MODI :: https://github.com/natanyamodi
// RACHIT BHALLA :: https://github.com/RachitBhalla15