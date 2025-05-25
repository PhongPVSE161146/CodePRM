import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    Alert,
    ActivityIndicator,
    Image,
    Animated,
    Easing
} from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithCredential,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../src/firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/FontAwesome';

// Đảm bảo rằng Expo WebBrowser được xử lý đúng
WebBrowser.maybeCompleteAuthSession();

const Snowfall = () => {
    const [flakes, setFlakes] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            const newFlake = {
                left: Math.random() * 100, // Random position
                animation: new Animated.Value(0), // Start position of snowflake
            };

            setFlakes((prev) => [...prev, newFlake]);

            // Animate falling
            Animated.timing(newFlake.animation, {
                toValue: 1,
                duration: Math.random() * 3000 + 5000, // Random duration for the snowflake to fall
                easing: Easing.linear,
                useNativeDriver: true,
            }).start();

            // Remove snowflake after it falls
            setTimeout(() => {
                setFlakes((prev) => prev.filter((flake) => flake !== newFlake));
            }, 1000);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            {flakes.map((flake, index) => (
                <Animated.View
                    key={index}
                    style={[
                        styles.snowflake,
                        {
                            left: `${flake.left}%`,
                            transform: [
                                {
                                    translateY: flake.animation.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0, "100%"], // Snowflake falling
                                    }),
                                },
                            ],
                        },
                    ]}
                >
                    <Text style={styles.snowflakeText}>❄️</Text>
                </Animated.View>
            ))}
        </>
    );
};

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false); // Biến để kiểm soát trạng thái loading khi đăng nhập

    // Thiết lập request cho Google OAuth
    const [request, response, promptAsync] = Google.useAuthRequest({
        clientId: "780547792146-d2br77673sf59rv810f73dthvdl84b7i.apps.googleusercontent.com",
        redirectUri: "https://auth.expo.io/@phongpvse161146/system_mobile",
        responseType: "id_token",
    });

    useEffect(() => {
        if (response?.type === "success") {
            const { id_token } = response.params;
            const credential = GoogleAuthProvider.credential(id_token);
            setLoading(true); // Bắt đầu trạng thái loading khi đăng nhập
            signInWithCredential(auth, credential)
                .then(() => {
                    setLoading(false); // Đặt trạng thái loading thành false khi đăng nhập thành công
                    Alert.alert("Đăng nhập Google thành công!");
                    navigation.navigate("HomePage"); // Chuyển hướng sang trang HomePage
                })
                .catch((error) => {
                    setLoading(false); // Đặt trạng thái loading thành false khi có lỗi
                    console.error("Firebase Auth Error:", error);
                    Alert.alert("Đăng nhập thất bại", error.message || "Có lỗi xảy ra khi đăng nhập với Google");
                });
        } else if (response?.type === "error") {
            setLoading(false); // Đặt trạng thái loading thành false khi có lỗi
            Alert.alert("Lỗi đăng nhập", response.error?.message || "Có lỗi xảy ra khi đăng nhập với Google");
        }
    }, [response]);

    const handleEmailLogin = () => {
        if (!email || !password) {
            Alert.alert("Lỗi", "Vui lòng nhập email và mật khẩu");
            return;
        }

        // Kiểm tra tính hợp lệ của email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Alert.alert("Lỗi", "Email không hợp lệ");
            return;
        }

        setLoading(true); // Bắt đầu trạng thái loading khi đăng nhập bằng email
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                setLoading(false); // Đặt trạng thái loading thành false khi đăng nhập thành công
                Alert.alert("Đăng nhập thành công!");
                navigation.navigate("HomePage");
            })
            .catch((error) => {
                setLoading(false); // Đặt trạng thái loading thành false khi có lỗi
                console.error("Email Auth Error:", error);
                Alert.alert("Đăng nhập thất bại!", error.message || "Có lỗi xảy ra khi đăng nhập");
            });
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Snowfall Effect */}
            <Snowfall />

            <View style={styles.container}>
                <Image style={styles.imgaeHeader} source={require('../../img/logo.png')} />
                <Text style={styles.title}>Trang Đăng Nhập</Text>
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                    keyboardType="email-address"
                />
                <TextInput
                    placeholder="Mật khẩu"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    style={styles.input}
                />
                <TouchableOpacity onPress={() => navigation.navigate("ResetPassword")}>
                    <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleEmailLogin} disabled={loading}>
                    <Text style={styles.buttonText}>ĐĂNG NHẬP</Text>
                </TouchableOpacity>

                <Text style={styles.title}>Hoặc</Text>

                <TouchableOpacity
                    style={styles.googleButton}
                    onPress={() => promptAsync()}
                    disabled={loading}
                >
                    <Icon name="google" size={20} color="#fff" style={styles.icon} />
                    <Text style={styles.buttonText}>ĐĂNG NHẬP BẰNG GOOGLE</Text>
                </TouchableOpacity>

                {loading && (
                    <View style={styles.loadingOverlay}>
                        <ActivityIndicator size="large" color="#ffffff" />
                    </View>
                )}
                <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                    <Text style={[styles.linkText, { color: 'black' }]}>Chưa có tài khoản? <Text style={{ color: '#cd853f' }}>Đăng ký ngay</Text></Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#dcdcdc",
    },
    imgaeHeader: {
        width: 250,
        height: 300,
        borderRadius: 10,
    },
    linkText: {
        color: "#4285F4",
        fontSize: 20,
        marginTop: 20,
        fontWeight: "bold",
    },
    forgotPasswordText: {
        color: "black",
        fontSize: 17,
        marginLeft: 200,
        marginBottom: 5,
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
        marginBottom: 100
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    input: {
        width: "100%",
        height: 40,
        borderBottomWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: "#4CAF50",
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
        marginBottom: 20,
        width: "100%",
        alignItems: "center",
    },
    googleButton: {
        backgroundColor: "#FF5733",
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 8,
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 10
    },
    icon: {
        marginRight: 10
    },
    loadingOverlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    snowflake: {
        position: "absolute",
        fontSize: 24,
    },
    snowflakeText: {
        fontSize: 30,
    },
});
