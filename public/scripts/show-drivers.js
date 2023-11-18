import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";

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
const driverCollection = collection(db, 'driver_data');

async function displayDrivers() {
  try {
    const querySnapshot = await getDocs(driverCollection);

    querySnapshot.forEach((docSnapshot) => {
      const driver = docSnapshot.data();
      const Name = driver.employee_name;

      const row = document.createElement('tr');
      row.innerHTML = `
      <td>${Name}</td>
      <td><a href="view-driver.html"><i class="fas fa-eye"></i></a></td>
      <td><a href="update-driver.html"><i class="fas fa-edit"></i></a></td>
      <td><a href="delete-driver.html"><i class="fas fa-trash-alt"></i></a></td>
    `;
    
      // Assuming you have a table body element with the id 'routesTableBody'
      const routesTableBody = document.getElementById('routesTableBody');
      routesTableBody.appendChild(row);
    });

  } catch (error) {
    console.error('Error getting routes:', error);
  }
}

// Call the function to display routes
displayDrivers();
