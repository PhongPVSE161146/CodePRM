// Firebase SDK Imports
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithCredential } from 'firebase/auth'; // Correct import for signInWithCredential


// Firebase Config (enter your credentials correctly)
const firebaseConfig = {
    apiKey: "AIzaSyANaCIGE65ek04vTpHcaFk39ghW4YVFSA0",
    authDomain: "login-f243e.firebaseapp.com",
    projectId: "login-f243e",
    storageBucket: "login-f243e.appspot.com",
    messagingSenderId: "929262282985",
    appId: "1:929262282985:web:bb117a23ffdc287b76a878"
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
