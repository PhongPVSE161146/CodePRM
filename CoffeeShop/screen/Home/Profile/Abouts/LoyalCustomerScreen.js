import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const members = [
    { id: '1', name: 'Bạc', points: '1,000', nextLevel: 'Vàng', progress: 30, color: ['#D3D3D3', '#A9A9A9'] },
    { id: '2', name: 'Vàng', points: '5,000', nextLevel: 'Kim Cương', progress: 70, color: ['#FFD700', '#FFA500'] },
    { id: '3', name: 'Kim Cương', points: '10,000', nextLevel: 'VIP', progress: 100, color: ['#00BFFF', '#1E90FF'] },
];

const LoyalCustomerScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={28} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Khách Hàng Thân Thiết</Text>
                <View style={{ width: 28 }} />
            </View>

            {/* Danh sách cấp độ */}
            <FlatList
                data={members}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <LinearGradient colors={item.color} style={styles.card}>
                        {/* <Image source={require('../../../assets/member-card.png')} style={styles.cardImage} /> */}
                        <View style={styles.info}>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.points}>{item.points} điểm</Text>
                            <Text style={styles.nextLevel}>Cấp tiếp theo: {item.nextLevel}</Text>
                            <View style={styles.progressBar}>
                                <View style={[styles.progress, { width: `${item.progress}%` }]} />
                            </View>
                        </View>
                    </LinearGradient>
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
        marginVertical: 10,
        marginHorizontal: 15,
        borderRadius: 15,
        padding: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 5 },
        elevation: 5,
    },
    cardImage: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
        marginRight: 15,
    },
    info: {
        flex: 1,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    points: {
        fontSize: 16,
        color: '#FFF8DC',
        marginVertical: 5,
    },
    nextLevel: {
        fontSize: 14,
        color: '#FFFAFA',
    },
    progressBar: {
        height: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 5,
        overflow: 'hidden',
        marginTop: 5,
    },
    progress: {
        height: '100%',
        backgroundColor: 'white',
    },
});

export default LoyalCustomerScreen;
