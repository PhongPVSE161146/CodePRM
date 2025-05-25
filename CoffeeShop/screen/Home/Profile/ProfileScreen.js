import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert, MediaTypeOptions } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import đúng cách
import { useNavigation } from '@react-navigation/native'; // Import navigation
import { getAuth } from 'firebase/auth'; // Để lấy thông tin người dùng từ Firebase
// import * as ImagePicker from 'expo-image-picker'; // Để chọn ảnh từ máy hoặc camera

export default function ProfileScreen() {
    const [imageUri, setImageUri] = useState(null);
    const [userInfo, setUserInfo] = useState({
        username: '',
        email: '',
        photoURL: '',
    }); // State để lưu thông tin người dùng
    const [image, setImage] = useState(null); // State để lưu ảnh mới
    const navigation = useNavigation(); // Khởi tạo navigation

    const auth = getAuth();
    const user = auth.currentUser; // Lấy thông tin người dùng hiện tại từ Firebase
    const requestPermission = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        return status === 'granted';
    };
    const handleLogout = () => {
        Alert.alert(
            "Đăng xuất",
            "Bạn có chắc chắn muốn đăng xuất không?",
            [
                { text: "Hủy", style: "cancel" },
                {
                    text: "Đăng xuất",
                    onPress: () => {
                        navigation.replace("Login"); // ✅ Quay về màn hình Login
                    },
                },
            ],
            { cancelable: true }
        );
    };
    // Hàm để lấy thông tin người dùng từ Firebase
    useEffect(() => {
        if (user) {
            const generatedPhotoURL = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt823sklj0_dEOAH3VzA3SR8ZUVftMdfiylA&s`; // Tạo ảnh avatar từ tên người dùng
            setUserInfo({
                username: user.displayName || 'Viruss',
                email: user.email,
                photoURL: generatedPhotoURL, // Gán URL ảnh avatar mới
            });
        }
    }, [user]);

    // Hàm để chọn ảnh từ máy hoặc camera
    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
            Alert.alert('Permission denied', 'Bạn cần cấp quyền truy cập vào thư viện ảnh.');
            return;
        }


        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images, // Pick only images
            allowsEditing: true, // Optionally allow editing (crop/resize)
            aspect: [4, 3], // Optionally set aspect ratio
            quality: 1, // Set quality to 1 (high quality)
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri); // Set selected image URI to state
        }
    };

    return (
        <View style={styles.container}>
            {/* Ảnh đại diện */}
            <TouchableOpacity onPress={pickImage}>
                <Image
                    source={{ uri: image || userInfo.photoURL }} // Nếu có ảnh mới thì sử dụng, nếu không thì dùng ảnh tạo từ tên người dùng
                    style={styles.avatar}
                />
            </TouchableOpacity>

            <Text style={styles.username}>{userInfo.username}</Text>
            <Text style={styles.email}>{userInfo.email}</Text>

            <View style={styles.divider} />
            <Text style={styles.sectionTitle}>Tài Khoản</Text>

            <TouchableOpacity
                style={styles.profileButton}
                onPress={() => navigation.navigate('ProfileDetail')}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'flex-start', width: '100%' }}>
                    <Ionicons name="person-circle-outline" size={30} color="white" />
                    <Text style={styles.profileText}>Thông Tin Cá Nhân</Text>
                    <Ionicons name="chevron-forward-outline" size={24} color="white" style={styles.back} />
                </View>




            </TouchableOpacity>

            <Text style={styles.sectionTitle2}>Khác</Text>
            <TouchableOpacity
                style={styles.profileButton}
                onPress={() => navigation.navigate('AppPolicy')}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'flex-start', width: '100%' }}>
                    <Ionicons name="document-text-outline" size={30} color="white" />
                    <Text style={styles.profileText}>Chính Sách Ứng Dụng</Text>
                    <Ionicons name="chevron-forward-outline" size={24} color="white" style={styles.back} />
                </View>



            </TouchableOpacity>
            <TouchableOpacity
                style={styles.profileButton}
                onPress={() => navigation.navigate('Settings')}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'flex-start', width: '100%' }}>
                    <Ionicons name="settings-outline" size={30} color="white" />
                    <Text style={styles.profileText}>Cài Đặt</Text>
                    <Ionicons name="chevron-forward-outline" size={24} color="white" style={styles.back} />
                </View>


            </TouchableOpacity>
            <TouchableOpacity
                style={styles.profileButton}
                onPress={() => navigation.navigate('SupportCall')}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'flex-start', width: '100%' }}>
                    <Ionicons name="call-outline" size={30} color="white" />
                    <Text style={styles.profileText}>Cuộc Gọi Hỗ Trợ</Text>
                    <Ionicons name="chevron-forward-outline" size={24} color="white" style={styles.back} />
                </View>


            </TouchableOpacity>
            <TouchableOpacity
                style={styles.profileButton}
                onPress={() => navigation.navigate('LoyalCustomer')}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'flex-start', width: '100%' }}>
                    <Ionicons name="people-outline" size={30} color="white" />
                    <Text style={styles.profileText}>Khách Hàng Thân Thiết</Text>
                    <Ionicons name="chevron-forward-outline" size={24} color="white" style={styles.back} />
                </View>


            </TouchableOpacity>
            <Text style={styles.sectionTitle3}>Version 24.2.1</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>

                <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>

                    <Ionicons name="log-out-outline" size={24} color="red" style={styles.icon} />
                    <Text style={styles.logoutText}>Đăng Xuất</Text>
                </TouchableOpacity>

            </View>
        </View>
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
        flexDirection: 'row', // Để các phần tử nằm ngang
        alignItems: 'center', // Căn giữa theo chiều dọc
        marginTop: 30,
    },
    icon: {
        marginRight: 8, // Tạo khoảng cách giữa icon và text
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