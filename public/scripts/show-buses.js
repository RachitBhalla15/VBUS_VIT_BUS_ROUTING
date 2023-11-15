import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import { getFirestore, collection, getDocs, query, orderBy, limit, startAfter, startAt, endBefore } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCGRFOEC7ZZS3ovP7kZm2BOga4l0BeUwJ4",
  authDomain: "vit-bus-tracking-firebase.firebaseapp.com",
  projectId: "vit-bus-tracking-firebase",
  storageBucket: "vit-bus-tracking-firebase.appspot.com",
  messagingSenderId: "584803144956",
  appId: "1:584803144956:web:6eba2cb9552e48de333379",
  measurementId: "G-F0R03J9ZZX"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const BusesCollection = collection(db, 'bus_data');

const routesTableBody = document.getElementById('routesTableBody');
const nextPageButton = document.getElementById('nextPage');
const prevPageButton = document.getElementById('prevPage');
let currentPage = 1;
const routesPerPage = 1;
let lastDocument = null;

nextPageButton.addEventListener('click', async () => {
  try {
    currentPage++;
    displayBuses();
  } catch (error) {
    console.error('Error getting routes:', error);
  }
});
prevPageButton.addEventListener('click', async () => {
  try {
    if (currentPage > 1) {
      // Move to the previous page
      currentPage--;

      let queryRef;

      if (currentPage === 1) {
        // First page
        queryRef = query(BusesCollection, orderBy('bus_number'), limit(routesPerPage));
      } else {
        // Subsequent pages
        queryRef = query(BusesCollection, orderBy('bus_number'), Start(lastDocument), limit(routesPerPage+1));
      }

      const querySnapshot = await getDocs(queryRef);

      if (querySnapshot.docs.length > 0) {
        // If there are documents, set lastDocument to the last one of the previous page
        lastDocument = querySnapshot.docs[querySnapshot.docs.length - 1];
        console.log(lastDocument.data());
      } else {
        // If there are no documents, reset lastDocument to null
        lastDocument = null;
      }
      

      displayBuses();
    }
  } catch (error) {
    console.error('Error getting routes:', error);
  }
});

async function displayBuses() {
  try {
    let queryRef;

    if (currentPage === 1) {
      // First page
      queryRef = query(BusesCollection, orderBy('bus_number'), limit(routesPerPage));
    } else {
      // Subsequent pages
      queryRef = query(BusesCollection, orderBy('bus_number'), startAfter(lastDocument), limit(routesPerPage));
    }

    const querySnapshot = await getDocs(queryRef);

    routesTableBody.innerHTML = ''; // Clear existing rows

    querySnapshot.forEach((docSnapshot) => {
      const route = docSnapshot.data();
      console.log(route);
      const BusNumber = route.bus_number;
      console.log(BusNumber);

      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${BusNumber}</td>
        <td><a href="#"><i class="fas fa-eye"></i></a></td>
        <td><a href="update-driver.html"><i class="fas fa-edit"></i></a></td>
        <td><a href="delete-driver.html"><i class="fas fa-trash-alt"></i></a></td>
      `;
      routesTableBody.appendChild(row);

      // Update the last document for the next iteration
      lastDocument = docSnapshot;
      console.log(lastDocument)
    });

    // Disable next page button if there are no more pages
    nextPageButton.disabled = querySnapshot.size < routesPerPage;

    // Disable prevPageButton on the first page
    prevPageButton.disabled = currentPage === 1;

  } catch (error) {
    console.error('Error getting routes:', error);
  }
}

// Call the function to display routes
displayBuses();