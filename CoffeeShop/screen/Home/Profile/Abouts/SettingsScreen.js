import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Switch, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const SettingsScreen = () => {
    const navigation = useNavigation();
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setIsDarkMode((prev) => !prev);
    };

    return (
        <View style={[styles.container, isDarkMode && styles.darkContainer]}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={26} color={isDarkMode ? "#FFF" : "#333"} />
                </TouchableOpacity>
                <Text style={[styles.headerText, isDarkMode && styles.darkText]}>Quay Lại</Text>
            </View>
            <Text style={{ fontSize: 26, fontWeight: "bold", color: "#333", textAlign: "center", marginBottom: 15 }}>
                Cài Đặt Ứng Dụng
            </Text>


            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Danh sách tùy chọn */}
                <View style={styles.settingsList}>
                    <TouchableOpacity style={[styles.option, isDarkMode && styles.darkOption]} onPress={() => navigation.navigate("Privacy")}>
                        <Ionicons name="lock-closed-outline" size={24} color={isDarkMode ? "#FFD700" : "#007AFF"} />
                        <Text style={[styles.optionText, isDarkMode && styles.darkText]}>Quyền riêng tư</Text>
                        <Ionicons name="chevron-forward" size={20} color={isDarkMode ? "#BBB" : "#888"} />
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.option, isDarkMode && styles.darkOption]} onPress={() => navigation.navigate("Support")}>
                        <Ionicons name="help-circle-outline" size={24} color={isDarkMode ? "#FFD700" : "#007AFF"} />
                        <Text style={[styles.optionText, isDarkMode && styles.darkText]}>Trợ giúp & Hỗ trợ</Text>
                        <Ionicons name="chevron-forward" size={20} color={isDarkMode ? "#BBB" : "#888"} />
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.option, isDarkMode && styles.darkOption]} onPress={() => navigation.navigate("Language")}>
                        <Ionicons name="globe-outline" size={24} color={isDarkMode ? "#FFD700" : "#007AFF"} />
                        <Text style={[styles.optionText, isDarkMode && styles.darkText]}>Ngôn ngữ</Text>
                        <Ionicons name="chevron-forward" size={20} color={isDarkMode ? "#BBB" : "#888"} />
                    </TouchableOpacity>
                </View>

                {/* Chế độ tối */}
                <View style={[styles.option, isDarkMode && styles.darkOption]}>
                    <Ionicons name="moon-outline" size={24} color={isDarkMode ? "#FFD700" : "#007AFF"} />
                    <Text style={[styles.optionText, isDarkMode && styles.darkText]}>Chế độ tối</Text>
                    <Switch value={isDarkMode} onValueChange={toggleDarkMode} />
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5",
    },
    darkContainer: {
        backgroundColor: "#222",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: "#FFF",
        elevation: 5,
        marginTop: 40,
    },
    backButton: {
        marginRight: 10,
    },
    headerText: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#333",
    },
    darkText: {
        color: "#FFF",
    },
    scrollView: {
        paddingHorizontal: 20,
    },
    settingsList: {
        backgroundColor: "#FFF",
        borderRadius: 10,
        paddingVertical: 10,
        elevation: 3,
        marginBottom: 10,
    },
    option: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#EEE",
    },
    darkOption: {
        backgroundColor: "#333",
        borderBottomColor: "#555",
    },
    optionText: {
        flex: 1,
        fontSize: 18,
        marginLeft: 10,
        color: "#333",
    },
});

export default SettingsScreen;
