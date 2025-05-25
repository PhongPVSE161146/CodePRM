import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";

export default function VerificationScreen({ navigation }) {
    const [isSent, setIsSent] = useState(false);  // Email đã gửi hay chưa
    const [loading, setLoading] = useState(false); // trạng thái loading nút gửi
    const [timeLeft, setTimeLeft] = useState(10);  // thời gian đếm ngược
    const [showLoginButton, setShowLoginButton] = useState(false); // hiển thị nút quay lại Login

    // Đếm ngược 10 giây khi email đã gửi
    useEffect(() => {
        let countdown;
        if (isSent && timeLeft > 0) {
            countdown = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setShowLoginButton(true);
        }
        return () => clearInterval(countdown);
    }, [isSent, timeLeft]);

    const handleSendVerification = () => {
        setLoading(true);

        // Giả lập gửi email thành công sau 1 giây
        setTimeout(() => {
            setLoading(false);
            setIsSent(true);
            setTimeLeft(10);
            setShowLoginButton(false);
            Alert.alert("Email xác minh đã được gửi", "Một email xác minh đã được gửi đến địa chỉ email của bạn.");
        }, 1000);
    };

    const handleBackToLogin = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: "Login" }],
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Xác minh</Text>
            <Text style={styles.subtitle}>
                Vui lòng kiểm tra hộp thư đến của bạn để xác minh email và nhấp vào liên kết xác minh.
            </Text>

            {!isSent ? (
                <TouchableOpacity
                    style={styles.verifyButton}
                    onPress={handleSendVerification}
                    disabled={loading}
                >
                    <Text style={styles.verifyText}>
                        {loading ? "Đang gửi..." : "Gửi liên kết xác minh"}
                    </Text>
                </TouchableOpacity>
            ) : (
                <Text style={styles.sentText}>
                    Email xác minh đã được gửi. Vui lòng kiểm tra hộp thư đến của bạn.
                </Text>
            )}

            {timeLeft > 0 && isSent && (
                <Text style={styles.countdownText}>Thời gian còn lại: {timeLeft} giây</Text>
            )}

            {showLoginButton && (
                <TouchableOpacity style={styles.loginButton} onPress={handleBackToLogin}>
                    <Text style={styles.loginText}>Quay lại trang đăng nhập</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#fff" },
    title: { fontSize: 28, fontWeight: "bold", textAlign: "center", marginBottom: 10 },
    subtitle: { textAlign: "center", color: "#666", marginBottom: 20 },
    verifyButton: {
        backgroundColor: "#FF5733",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 20,
    },
    verifyText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
    sentText: { textAlign: "center", color: "#FF5733", marginTop: 20 },
    countdownText: { textAlign: "center", marginTop: 20, color: "#333" },
    loginButton: {
        backgroundColor: "#4CAF50",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 20,
    },
    loginText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
