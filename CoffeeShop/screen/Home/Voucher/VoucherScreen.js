import React from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';

const vouchers = [
  {
    id: '1',
    title: 'Voucher giảm 50k',
    code: 'DISCOUNT50',
    applicableProducts: 'Áp dụng cho nhiều sản phẩm',
  },
  {
    id: '2',
    title: 'Voucher giảm 20%',
    code: 'SALE20',
    applicableProducts: 'Sản phẩm ID: 123',
  },
];

export default function VoucherScreen({ navigation }) {
  const loading = false; // tạm đặt loading false để demo UI

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎁 Danh sách Voucher</Text>

      {vouchers.length === 0 ? (
        <View style={styles.noVoucherContainer}>
          <Text style={styles.noVoucherText}>Không có voucher nào ở đây cả</Text>
        </View>
      ) : (
        <FlatList
          data={vouchers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate('VoucherDetail', { voucherId: item.id })}
            >
              <Text style={styles.voucherTitle}>{item.title}</Text>
              <Text style={styles.voucherCode}>Mã: {item.code}</Text>
              <Text style={styles.voucherDetail}>Áp dụng: {item.applicableProducts}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#99FFCC' 
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginTop: 50, 
    marginBottom: 20 
  },
  card: { 
    backgroundColor: '#f1f1f1', 
    padding: 15, 
    borderRadius: 8, 
    marginBottom: 10 
  },
  voucherTitle: { 
    fontSize: 18, 
    fontWeight: 'bold' 
  },
  voucherCode: { 
    fontSize: 16, 
    color: '#FF5733', 
    marginTop: 5 
  },
  voucherDetail: { 
    fontSize: 14, 
    color: '#666', 
    marginTop: 5 
  },
  loadingContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  noVoucherContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  noVoucherText: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    color: '#888', 
    textAlign: 'center',
    marginBottom: 80
  },
});
