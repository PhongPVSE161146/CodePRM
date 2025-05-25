import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


import HomePageScreen from '../screen/Home/HomePageScreen';
import VoucherScreen from '../screen/Home/Voucher/VoucherScreen';
import HistoryScreen from '../screen/Home/History/HistoryScreen';
import ProfileScreen from '../screen/Home/Profile/ProfileScreen';


const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
    const navigation = useNavigation();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,

                tabBarStyle: styles.tabBarStyle,
                tabBarIcon: ({ color, size }) => {
                    let iconName;
                    switch (route.name) {
                        case 'Home': iconName = 'home'; break;
                        case 'Voucher': iconName = 'gift'; break;
                
                        case 'History': iconName = 'time'; break;
                        case 'Profile': iconName = 'person'; break;
                        default: iconName = 'alert-circle';
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#FF4081',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="Home" component={HomePageScreen} />
            <Tab.Screen name="Voucher" component={VoucherScreen} />

        
            <Tab.Screen name="History" component={HistoryScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    tabBarStyle: {
        height: 65,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    scanButton: {
        position: 'absolute',
        bottom: -10, // Đẩy lên so với thanh tab
        alignSelf: 'center',
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#FF4081',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#FF4081',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 6,

    },
    scanInnerButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#FF4081',
        justifyContent: 'center',
        alignItems: 'center',

    },
});

