import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../src/firebaseConfig";  // Đảm bảo import đúng firebaseConfig

export default function SignUpScreen({ navigation }) {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSignUp = () => {
        if (!email || !password || !fullName) {
            Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin");
            return;
        }

        setLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log("User signed up: ", user);
                // Chuyển hướng đến trang xác thực mà không hiển thị thông báo đăng ký thành công
                navigation.navigate("Verification"); // Chuyển hướng sang trang Verification
            })
            .catch((error) => {
                setLoading(false);
                const errorCode = error.code;
                const errorMessage = error.message;
                // console.error("Error during sign up: ", errorCode, errorMessage);
                Alert.alert("Đăng ký thất bại", "Tài Khoản Này Đã Đăng Kí.");
            });
    };

    return (
        <View style={styles.container}>
            <Image style={styles.imgaeHeader} source={require('../../img/logo.png')} />
            <Text style={styles.title}>Sign Up</Text>

            <TextInput
                style={styles.input}
                placeholder="Full name"
                value={fullName}
                onChangeText={setFullName}
            />
            <TextInput
                style={styles.input}
                placeholder="E-mail"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <TouchableOpacity style={styles.button} onPress={handleSignUp} disabled={loading}>
                <Text style={styles.buttonText}>SIGN UP</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.footerText}>
                    Already have an account? <Text style={styles.link}>Login</Text>
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#fff" },
    imgaeHeader: {
        width: 250,
        height: 300,
        borderRadius: 10,
        marginLeft: 50,
    },
    title: { fontSize: 28, fontWeight: "bold", textAlign: "center", marginBottom: 16 },
    input: { height: 50, borderColor: "#ccc", borderWidth: 1, borderRadius: 8, paddingHorizontal: 10, marginBottom: 15 },
    button: { backgroundColor: "#FF5733", paddingVertical: 12, borderRadius: 8, alignItems: "center" },
    buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
    footerText: { marginTop: 20, fontSize: 20, textAlign: "center", color: "#666", marginBottom: 150 },
    link: { color: "#FF5733", fontWeight: "bold" }
});
