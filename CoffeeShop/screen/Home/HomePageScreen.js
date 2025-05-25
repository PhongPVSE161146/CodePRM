import React from 'react';
import { View, Text, TextInput, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

// import navigation nếu cần
import { useNavigation } from '@react-navigation/native';

const drinks = [
  { name: 'Chocolate', price: '10000' },
  { name: 'Americano', price: '10000' },
  { name: 'Cappuchino', price: '10000' },
  { name: 'Caramel Machiato', price: '10000' },
];

const HomePageScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, backgroundColor: '#F7F7F7', padding: 16, marginTop: 40 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Ionicons name="person-outline" size={24} />
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'green' }}>Coffee Shop</Text>
          <Feather name="shopping-cart" size={24} />
        </View>

        <TextInput
          placeholder="Search your drink"
          style={{
            backgroundColor: '#EEE',
            borderRadius: 8,
            padding: 10,
            marginVertical: 12,
          }}
        />

        <Section title="Popular Drink" data={drinks} horizontal={true} />
        <Section title="Popular Hot Drink" data={drinks.slice(0, 2)} horizontal={false} />
        <Section title="Popular Cold Drink" data={[{ ...drinks[1], name: 'Ice Americano' }]} horizontal={false} />
      </ScrollView>

      {/* Nút chat nổi ở góc phải dưới màn hình */}
      <TouchableOpacity
        onPress={() => navigation.navigate('Chat')}
        style={styles.chatButton}
      >
        <Ionicons name="chatbubble-ellipses-outline" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const Section = ({ title, data, horizontal }) => (
  <View style={{ marginBottom: 24 }}>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{title}</Text>
      <Text style={{ color: 'gray' }}>All {'>'}</Text>
    </View>

    <ScrollView horizontal={horizontal} style={{ marginTop: 12 }}>
      {data.map((item, index) => (
        <DrinkCard key={index} drink={item} horizontal={horizontal} />
      ))}
    </ScrollView>
  </View>
);

const DrinkCard = ({ drink, horizontal }) => (
  <View
    style={{
      width: horizontal ? 140 : '100%',
      backgroundColor: horizontal ? '#1C2B2D' : '#FFF',
      borderRadius: 12,
      marginRight: horizontal ? 12 : 0,
      padding: horizontal ? 0 : 12,
      marginTop: horizontal ? 12 : 8,
      flexDirection: horizontal ? 'column' : 'row',
      alignItems: horizontal ? 'center' : 'center',
    }}
  >
    <Image
      source={drink.image}
      style={{ width: 60, height: 60, resizeMode: 'contain', margin: horizontal ? 20 : 0 }}
    />
    <View style={{ marginLeft: horizontal ? 0 : 12, alignItems: horizontal ? 'center' : 'flex-start' }}>
      <Text style={{ color: horizontal ? 'white' : 'black', fontWeight: 'bold' }}>{drink.name}</Text>
      <Text style={{ color: horizontal ? 'white' : 'gray' }}>10000</Text>
    </View>
    {!horizontal && <TouchableOpacity style={{ marginLeft: 'auto' }}><Feather name="plus-circle" size={20} /></TouchableOpacity>}
  </View>
);

const styles = StyleSheet.create({
  chatButton: {
    position: 'absolute',
    bottom: 90,
    right: 20,
    backgroundColor: '#0084ff',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, // shadow trên Android
    shadowColor: '#000', // shadow trên iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  }
});

export default HomePageScreen;
