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

const attendanceTableBody = document.getElementById('attendanceTableBody');

    async function displayAttendanceDetails() {
      const querySnapshot = await getDocs(collection(db, 'Attendance', 'details', 'students'));
      
      querySnapshot.forEach((docSnapshot) => {
        const bus = docSnapshot.data();
        const busNo = bus.busNo;

        bus.students.forEach((student) => {
          const studentName = student.name;
          const attendanceStatus = student.attendance ? 'Present' : 'Absent';

          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${busNo}</td>
            <td>${studentName}</td>
            <td>${attendanceStatus}</td>
          `;

          attendanceTableBody.appendChild(row);
        });
      });
    }

    displayAttendanceDetails();