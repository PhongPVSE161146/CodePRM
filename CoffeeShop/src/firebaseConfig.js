// Firebase SDK Imports
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithCredential } from 'firebase/auth'; // Correct import for signInWithCredential


// Firebase Config (enter your credentials correctly)
const firebaseConfig = {
  apiKey: "AIzaSyCmhFY91oRVB-4kzVNOftChOdJ78XZbJ_I",
  authDomain: "systemmobile1.firebaseapp.com",
  projectId: "systemmobile1",
  storageBucket: "systemmobile1.appspot.com",
  messagingSenderId: "780547792146",
  appId: "1:780547792146:web:54bd3868d147318b7727cb",
  measurementId: "G-7Z0MSP9QR2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Export the authentication object
export { auth};


// Example Usage for Google Login (can be added in your login flow):
export const googleSignIn = async (id_token) => {
    const credential = GoogleAuthProvider.credential(id_token);
    try {
        const userCredential = await signInWithCredential(auth, credential);
        console.log('User signed in with Google:', userCredential.user);
        // Continue with flow after successful sign-in
        return userCredential.user; // Return user for further use in your app
    } catch (error) {
        console.error('Error signing in with Google:', error);
        if (error.code === 'auth/account-exists-with-different-credential') {
            console.error('This email is already linked with a different provider.');
        }
        throw error;  // Rethrow error so it can be handled in the calling function
    }
};
