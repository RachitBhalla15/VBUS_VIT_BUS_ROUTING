/*import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
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
const firestore = getFirestore();

*/

/*
async function isValidCredentials(id, password) {
  try {
    // Fetch the user document from Firestore based on the provided id
    const userDoc = await firestore.collection('allowedUsers').doc(id).get();

    if (userDoc.exists) {
      // If the document exists, compare the stored password with the provided password
      const storedPassword = userDoc.data().password;

      if (storedPassword === password) {
        return true;
      } else {
        console.log('Password does not match');
        return false;
      }
    } else {
      // The user with the provided id doesn't exist
      console.log('User with ID does not exist');
      return false;
    }
  } catch (error) {
    // Handle any errors that may occur during Firestore interaction
    console.error('Error fetching user credentials:', error);
    return false;
  }
}
*/



function togglePassword() {
  var pwBox = document.querySelector('.pw-box');
  var toggleBtn = document.querySelector('.toggle-password');
  if (pwBox.type === "password") {
    pwBox.type = "text";
    toggleBtn.innerHTML = '<i class="fa fa-eye-slash"></i>';
  } else {
    pwBox.type = "password";
    toggleBtn.innerHTML = '<i class="fa fa-eye"></i>';
  }
}

function isValidCredentials(id, password, validCredentials) {
  if (validCredentials.hasOwnProperty(id)) {
    return validCredentials[id].password === password ? validCredentials[id].page : false;
  } else {
    return false;
  }
}


var validCredentials = {
  "admin1": {password: "password1", page: "admin-index.html"},
  "coord1": {password: "password2", page: "index.html"}
};

function signIn() {
  var id = document.getElementById("id").value;
  var password = document.getElementById("password").value;

  var page = isValidCredentials(id.toLowerCase(), password, validCredentials);
  if (page) {
    window.location.href = page;
  } else {
    alert("Invalid username or password");
  }
}


// Select the button by its class name "submit-button"
document.addEventListener('DOMContentLoaded', function () {
  const submitButton = document.querySelector('.submit-button');
  var UserName=document.querySelector('.id-box');
  const pwbox = document.getElementById('password');

  submitButton.addEventListener('click', signIn);

  // Attach a keydown event listener to the password input
  pwbox.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      signIn();
    }
  });

  UserName.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      signIn();
    }
  });

});