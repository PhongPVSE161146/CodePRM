import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const ResetPasswordScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");

    const handleResetPassword = () => {
        if (!email) {
            Alert.alert("Lỗi", "Vui lòng nhập email");
            return;
        }

        // Giả lập thành công gửi email reset mật khẩu
        Alert.alert(
            "Thành công",
            "Email reset mật khẩu đã được gửi. Vui lòng kiểm tra hộp thư của bạn.",
            [
                { text: "OK", onPress: () => navigation.navigate("Login") }
            ]
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Reset Password</Text>
            <TextInput
                style={styles.input}
                placeholder="E-mail"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
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
        paddingHorizontal: 20,
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
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: '#007AFF',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    footerText: { 
        marginTop: 20, 
        fontSize: 16, 
        color: "#666" 
    },
    link: { 
        color: "#FF5733", 
        fontWeight: "bold" 
    }
});

export default ResetPasswordScreen;
