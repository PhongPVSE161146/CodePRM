import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { useEffect, useState } from 'react';
import { signInWithCredential, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebaseConfig';  // Ensure auth is correctly imported from firebaseConfig
import { Button, Text, View, ActivityIndicator } from 'react-native';

const GoogleAuth = ({ navigation }) => {
    const [user, setUser] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    // Google OAuth Configuration
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        clientId: '780547792146-d2br77673sf59rv810f73dthvdl84b7i.apps.googleusercontent.com',  // Your Google Client ID
    });

    useEffect(() => {
        WebBrowser.maybeCompleteAuthSession();  // Handle completing the OAuth session

        if (response?.type === 'success') {
            const { id_token } = response.params;  // Retrieve id_token from the response
            const credential = GoogleAuthProvider.credential(id_token);  // Create a credential from Google ID token

            setLoading(true);  // Show loading indicator

            // Sign in with Firebase using the Google credential
            signInWithCredential(auth, credential)
                .then(userCredential => {
                    setUser(userCredential.user);  // Set user state on successful login
                    setLoading(false);  // Stop loading indicator
                    navigation.navigate('Home');  // Navigate to Home after successful login
                })
                .catch(error => {
                    setLoading(false);  // Stop loading indicator on error
                    setErrorMessage('Đăng nhập thất bại. Vui lòng thử lại.');
                    console.error('Error during Google login:', error);
                });
        } else if (response?.type === 'error') {
            setLoading(false);  // Stop loading indicator on error
            setErrorMessage('Lỗi đăng nhập OAuth. Vui lòng thử lại.');
            console.error('OAuth Error:', response.error);
        }
    }, [response]);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Button title="Login with Google" onPress={() => promptAsync()} disabled={loading} />
            {loading && <ActivityIndicator size="large" color="#0000ff" />}  {/* Show loading indicator during login */}
            {user && <Text>Xin chào, {user.displayName}</Text>} {/* Display user's name after successful login */}
            {errorMessage && <Text style={{ color: 'red' }}>{errorMessage}</Text>} {/* Display error message */}
        </View>
    );
};

export default GoogleAuth;