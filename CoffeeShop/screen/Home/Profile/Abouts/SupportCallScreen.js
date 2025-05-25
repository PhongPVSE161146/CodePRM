import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Linking, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const supportNumbers = [
    { id: '1', name: 'Hỗ trợ kỹ thuật', phone: '18001008' },
    { id: '2', name: 'Chăm sóc khách hàng', phone: '19008198' },
    { id: '3', name: 'Hỗ trợ thanh toán', phone: '19001234' },
    { id: '4', name: 'Tư vấn sản phẩm', phone: '18005432' },
];

const SupportCallScreen = ({ navigation }) => {
    const handleCall = (phoneNumber) => {
        Linking.openURL(`tel:${phoneNumber}`);
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={28} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Hỗ Trợ Khách Hàng</Text>
                <View style={{ width: 28 }} />
            </View>

            {/* Danh sách số điện thoại hỗ trợ */}
            <FlatList
                data={supportNumbers}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.card} onPress={() => handleCall(item.phone)}>
                        <Ionicons name="call" size={24} color="#007AFF" style={styles.icon} />
                        <View style={styles.info}>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.phone}>{item.phone}</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={24} color="#ccc" />
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#007AFF',
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginTop: 30,
    },
    headerTitle: {
        flex: 1,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',

    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 15,
        marginVertical: 5,
        marginHorizontal: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
    },
    icon: {
        marginRight: 15,
    },
    info: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    phone: {
        fontSize: 14,
        color: '#666',
    },
});

export default SupportCallScreen;
