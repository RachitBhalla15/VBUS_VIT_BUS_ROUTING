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
      
      // Check authentication state
      getAuth(firebase).onAuthStateChanged(function(user) {
        if (!user) {
          // User is not authenticated, redirect to login
          const customLoggedIn = localStorage.getItem('customLogin') === 'true';

          if (!customLoggedIn) {
            // Neither Google login nor custom login is detected, redirect to login
            window.location.href = 'login.html';
          }
        }
      });