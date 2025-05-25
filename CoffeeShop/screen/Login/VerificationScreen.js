import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { getAuth, sendEmailVerification, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../src/firebaseConfig"; // Đảm bảo đã import auth đúng

export default function VerificationScreen({ navigation }) {
    const [isSent, setIsSent] = useState(false);  // Kiểm tra xem email có được gửi chưa
    const [loading, setLoading] = useState(false);  // Kiểm tra trạng thái loading
    const [timeLeft, setTimeLeft] = useState(10);  // Thời gian đếm ngược
    const [showLoginButton, setShowLoginButton] = useState(false); // Kiểm tra có hiển thị nút quay lại login không

    const authInstance = getAuth(); // Khởi tạo instance auth từ firebase

    // Kiểm tra trạng thái email khi màn hình này được hiển thị hoặc người dùng quay lại
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(authInstance, (user) => {
            if (user) {
                if (user.emailVerified) {
                    Alert.alert("Email đã được xác minh", "Email của bạn đã được xác minh thành công.");
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Login' }] // Điều hướng về trang đăng nhập và reset stack
                    });
                } else {
                    setIsSent(false);  // Nếu email chưa xác minh, reset trạng thái gửi email
                }
            }
        });

        return () => unsubscribe(); // Cleanup listener khi component unmount
    }, [authInstance, navigation]);

    // Hàm gửi email xác minh
    const handleSendVerification = () => {
        const user = authInstance.currentUser;

        if (user) {
            setLoading(true); // Bắt đầu trạng thái loading
            sendEmailVerification(user)
                .then(() => {
                    setIsSent(true); // Email đã được gửi
                    Alert.alert("Email xác minh đã được gửi", "Một email xác minh đã được gửi đến địa chỉ email của bạn.");
                    startCountdown(); // Bắt đầu đếm ngược 10 giây
                })
                .catch((error) => {
                    console.error("Lỗi gửi email xác minh:", error);
                    Alert.alert("Lỗi", "Không thể gửi email xác minh. Vui lòng thử lại.");
                })
                .finally(() => {
                    setLoading(false); // Kết thúc trạng thái loading
                });
        } else {
            Alert.alert("Lỗi", "Không có người dùng đăng nhập.");
        }
    };

    // Hàm đếm ngược 10 giây
    const startCountdown = () => {
        let time = 10;
        setShowLoginButton(false); // Ẩn nút quay lại login ban đầu
        const countdown = setInterval(() => {
            time -= 1;
            setTimeLeft(time);
            if (time === 0) {
                clearInterval(countdown);
                setShowLoginButton(true); // Hiển thị nút quay lại login sau 10 giây
            }
        }, 1000);
    };

    // Hàm quay lại màn hình login
    const handleBackToLogin = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }] // Điều hướng về trang đăng nhập
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Xác minh</Text>
            <Text style={styles.subtitle}>Vui lòng kiểm tra hộp thư đến của bạn để xác minh email và nhấp vào liên kết xác minh.</Text>

            {!isSent ? (
                <TouchableOpacity style={styles.verifyButton} onPress={handleSendVerification} disabled={loading}>
                    <Text style={styles.verifyText}>Gửi liên kết xác minh</Text>
                </TouchableOpacity>
            ) : (
                <Text style={styles.sentText}>Email xác minh đã được gửi. Vui lòng kiểm tra hộp thư đến của bạn.</Text>
            )}

            {/* Hiển thị thời gian còn lại và nút quay lại login nếu đếm ngược xong */}
            {timeLeft > 0 && (
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
        marginTop: 20
    },
    verifyText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
    sentText: { textAlign: "center", color: "#FF5733", marginTop: 20 },
    countdownText: { textAlign: "center", marginTop: 20, color: "#333" },
    loginButton: {
        backgroundColor: "#4CAF50",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 20
    },
    loginText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
