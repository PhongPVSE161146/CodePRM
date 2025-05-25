import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../src/firebaseConfig";  // Đảm bảo import firebaseConfig đúng

const ResetPasswordScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");

    const handleResetPassword = () => {
        if (!email) {
            Alert.alert("Lỗi", "Vui lòng nhập email");
            return;
        }

        sendPasswordResetEmail(auth, email)
            .then(() => {
                Alert.alert("Thành công", "Email reset mật khẩu đã được gửi. Vui lòng kiểm tra hộp thư của bạn.");
                navigation.navigate("Login");  // Chuyển hướng về màn hình Login sau khi gửi email
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error("Reset password error: ", errorCode, errorMessage);
                Alert.alert("Lỗi", errorMessage || "Có lỗi xảy ra khi gửi email reset mật khẩu.");
            });
    };

    return (
        <View style={styles.container}>
            <Image style={styles.imgaeHeader} source={require('../../img/logo.png')} />
            <Text style={styles.title}>Reset Password</Text>
            <TextInput
                style={styles.input}
                placeholder="E-mail"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            {/* <TextInput
                style={styles.input}
                placeholder="Enter new password"
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                placeholder="Confirm new password"
                secureTextEntry
            /> */}
            <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
                <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.footerText}>
          Already have an account? <Text style={styles.link}>Sign In</Text>
        </Text>
      </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e6e6fa',
    },
    imgaeHeader: {
        width: 250,
        height: 300,
        borderRadius: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '80%',
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    button: {
        backgroundColor: '#007AFF',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    footerText: { marginTop: 20, fontSize: 20, color: "#666" },
  link: { color: "#FF5733", fontWeight: "bold" }
});

export default ResetPasswordScreen;
