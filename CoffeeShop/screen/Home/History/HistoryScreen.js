import React from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';

const transactions = [
  {
    id: '1',
    date: '26/05/2025',
    amount: -50000,
    status: 'Đã chi tiêu',
  },
  {
    id: '2',
    date: '25/05/2025',
    amount: 100000,
    status: 'Nạp tiền',
  },
];

export default function HistoryScreen({ navigation }) {
  const loading = false; // Giả sử không còn loading để demo UI

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📜 Lịch sử Thanh Toán</Text>

      {transactions.length === 0 ? (
        <View style={styles.noTransactionContainer}>
          <Text style={styles.noTransactionText}>Không có giao dịch nào</Text>
        </View>
      ) : (
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate('HistoryDetail', { transactionId: item.id })}
            >
              <Text style={styles.transactionDate}>Ngày: {item.date}</Text>
              <Text style={styles.transactionAmount}>Số tiền: {item.amount.toLocaleString()}đ</Text>
              <Text style={[styles.transactionStatus, { color: item.amount < 0 ? 'red' : 'green' }]}>
                {item.status}
              </Text>
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
    backgroundColor: '#FFFFCC' 
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
  transactionDate: { 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
  transactionAmount: { 
    fontSize: 16, 
    color: '#333', 
    marginTop: 5 
  },
  transactionStatus: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    marginTop: 5 
  },
  loadingContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  noTransactionContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  noTransactionText: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    color: '#888', 
    textAlign: 'center',
    marginBottom: 80
  },
});
