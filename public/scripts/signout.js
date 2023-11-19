import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCGRFOEC7ZZS3ovP7kZm2BOga4l0BeUwJ4",
  authDomain: "vit-bus-tracking-firebase.firebaseapp.com",
  projectId: "vit-bus-tracking-firebase",
  storageBucket: "vit-bus-tracking-firebase.appspot.com",
  messagingSenderId: "584803144956",
  appId: "1:584803144956:web:6eba2cb9552e48de333379",
  measurementId: "G-F0R03J9ZZX"
};

const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);

// Set initial timer for automatic sign-out after 10 minutes
let signOutTimer;

function resetSignOutTimer() {
  // Clear the existing timer and set a new one
  clearTimeout(signOutTimer);
  signOutTimer = setTimeout(() => {
    // Call the signOutUser function after 10 minutes of inactivity
    signOutUser();
  }, 10 * 60 * 1000); // 10 minutes in milliseconds
}

// Function to sign out the user
function signOutUser() {
  // Sign out the user using Firebase Auth
  auth.signOut().then(() => {
    // Clear the user details from localStorage
    localStorage.removeItem('username');
    localStorage.clear();
    if ('caches' in window) {
      caches.keys().then(cacheNames => {
        cacheNames.forEach(cacheName => {
          caches.delete(cacheName);
        });
      });
    }
    // Redirect to the login page after sign-out
    window.location.href = 'login.html';
  }).catch((error) => {
    // Handle sign-out errors
    console.error("Sign-out error: ", error);
  });
}

// Add a click event listener to the sign-out button
const signOutElement = document.getElementById('signOut');
if (signOutElement) {
  signOutElement.addEventListener('click', signOutUser);
}

// Add an event listener for user activity to reset the sign-out timer
document.addEventListener('mousemove', resetSignOutTimer);
document.addEventListener('keydown', resetSignOutTimer);
