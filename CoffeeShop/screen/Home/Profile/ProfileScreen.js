import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


export default function ProfileScreen() {
    const [imageUri, setImageUri] = useState(null);
    const [userInfo, setUserInfo] = useState({
        username: 'Viruss',
        email: 'viruss@example.com',
        photoURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt823sklj0_dEOAH3VzA3SR8ZUVftMdfiylA&s',
    });
    const navigation = useNavigation();

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission denied', 'Bạn cần cấp quyền truy cập vào thư viện ảnh.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
        }
    };

    const handleLogout = () => {
        Alert.alert(
            "Đăng xuất",
            "Bạn có chắc chắn muốn đăng xuất không?",
            [
                { text: "Hủy", style: "cancel" },
                { text: "Đăng xuất", onPress: () => navigation.replace("Login") },
            ],
            { cancelable: true }
        );
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={pickImage}>
                <Image
                    source={{ uri: imageUri || userInfo.photoURL }}
                    style={styles.avatar}
                />
            </TouchableOpacity>

            <Text style={styles.username}>{userInfo.username}</Text>
            <Text style={styles.email}>{userInfo.email}</Text>

            <View style={styles.divider} />
            <Text style={styles.sectionTitle}>Tài Khoản</Text>

           
            <Text style={styles.sectionTitle2}>Khác</Text>
            <OptionItem icon="document-text-outline" label="Chính Sách Ứng Dụng" onPress={() => navigation.navigate('AppPolicy')} />
            <OptionItem icon="settings-outline" label="Cài Đặt" onPress={() => navigation.navigate('Settings')} />
            <OptionItem icon="call-outline" label="Cuộc Gọi Hỗ Trợ" onPress={() => navigation.navigate('SupportCall')} />
            <OptionItem icon="people-outline" label="Khách Hàng Thân Thiết" onPress={() => navigation.navigate('LoyalCustomer')} />

            <Text style={styles.sectionTitle3}>Version 24.2.1</Text>

            <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                <Ionicons name="log-out-outline" size={24} color="red" style={styles.icon} />
                <Text style={styles.logoutText}>Đăng Xuất</Text>
            </TouchableOpacity>
        </View>
    );
}

function OptionItem({ icon, label, onPress }) {
    return (
        <TouchableOpacity style={styles.profileButton} onPress={onPress}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'flex-start', width: '100%' }}>
                <Ionicons name={icon} size={30} color="white" />
                <Text style={styles.profileText}>{label}</Text>
                <Ionicons name="chevron-forward-outline" size={24} color="white" style={styles.back} />
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFFFCC',
        padding: 20,
    },
    back: {
        position: 'absolute',
        right: 5,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 30,
    },
    icon: {
        marginRight: 8,
        marginTop: 40,
        fontSize: 27,
    },
    logoutText: {
        color: 'red',
        fontSize: 22,
        marginTop: 40,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 10,
        marginTop: 30,
    },
    username: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    email: {
        fontSize: 14,
        color: 'gray',
        marginBottom: 10,
    },
    divider: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        width: '100%',
        marginVertical: 10,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
    },
    sectionTitle2: {
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        marginTop: 10,
    },
    sectionTitle3: {
        fontSize: 15,
        marginTop: 15,
    },
    profileButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#4CAF50',
        padding: 12,
        borderRadius: 8,
        marginTop: 10,
        width: '100%',
        justifyContent: 'center',
    },
    profileText: {
        color: '#fff',
        fontSize: 16,
        marginLeft: 5,
    },
});