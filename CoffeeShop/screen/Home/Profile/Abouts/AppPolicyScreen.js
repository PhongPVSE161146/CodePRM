import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const PolicyScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1, backgroundColor: "#F5F5F5", paddingHorizontal: 20, paddingTop: 50 }}>
            {/* Nút Quay Lại */}
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
                <Ionicons name="arrow-back" size={28} color="#333" />
                <Text style={{ fontSize: 20, marginLeft: 10, color: "#333", fontWeight: "bold" }}>Quay lại</Text>
            </TouchableOpacity>

            {/* Tiêu đề */}
            <Text style={{ fontSize: 26, fontWeight: "bold", color: "#333", textAlign: "center", marginBottom: 15 }}>
                Chính Sách Ứng Dụng
            </Text>

            {/* Hình ảnh minh họa */}
            <Image
                source={{ uri: "https://img.freepik.com/free-vector/privacy-policy-concept-illustration_114360-7853.jpg" }}
                style={{ width: "100%", height: 200, borderRadius: 15, marginBottom: 20 }}
                resizeMode="cover"
            />

            {/* Nội dung chính sách */}
            <ScrollView
                style={{ backgroundColor: "#FFF", borderRadius: 12, padding: 15, elevation: 5 }}
                showsVerticalScrollIndicator={false}
            >
                <Text style={{ fontSize: 18, fontWeight: "bold", color: "#444", marginBottom: 10 }}>🔐 Bảo Mật Thông Tin</Text>
                <Text style={{ fontSize: 16, color: "#666", lineHeight: 24 }}>
                    - Chúng tôi cam kết bảo vệ dữ liệu cá nhân của bạn một cách an toàn nhất.
                </Text>

                <Image
                    source={{ uri: "https://img.freepik.com/free-vector/secure-login-concept-illustration_114360-4682.jpg" }}
                    style={{ width: "100%", height: 150, borderRadius: 10, marginVertical: 10 }}
                    resizeMode="cover"
                />

                <Text style={{ fontSize: 18, fontWeight: "bold", color: "#444", marginTop: 10 }}>📜 Điều Khoản & Điều Kiện</Text>
                <Text style={{ fontSize: 16, color: "#666", lineHeight: 24, marginTop: 5 }}>
                    - Dữ liệu của bạn sẽ không bị chia sẻ với bên thứ ba nếu không có sự đồng ý.
                    {"\n"}- Bạn có quyền truy cập và chỉnh sửa thông tin bất cứ lúc nào.
                </Text>

                <Image
                    source={{ uri: "https://img.freepik.com/free-vector/terms-conditions-concept-illustration_114360-7250.jpg" }}
                    style={{ width: "100%", height: 150, borderRadius: 10, marginVertical: 10 }}
                    resizeMode="cover"
                />

                <Text style={{ fontSize: 18, fontWeight: "bold", color: "#444", marginTop: 10 }}>⚖️ Quy Định Pháp Lý</Text>
                <Text style={{ fontSize: 16, color: "#666", lineHeight: 24, marginTop: 5 }}>
                    - Các điều khoản có thể thay đổi để phù hợp với quy định mới nhất.
                </Text>
            </ScrollView>
        </View>
    );
};

export default PolicyScreen;
