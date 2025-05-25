// ChatScreen.js
import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  KeyboardAvoidingView,
  Platform
} from 'react-native';

import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp
} from 'firebase/firestore';

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyANaCIGE65ek04vTpHcaFk39ghW4YVFSA0",
  authDomain: "login-f243e.firebaseapp.com",
  projectId: "login-f243e",
  storageBucket: "login-f243e.appspot.com",
  messagingSenderId: "929262282985",
  appId: "1:929262282985:web:bb117a23ffdc287b76a878"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Đặt userId tạm (sau có thể lấy từ Firebase Auth)
const userId = 'user123';

export default function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState([]);
  const flatListRef = useRef();

  // Lắng nghe tin nhắn mới
  useEffect(() => {
    const messagesRef = collection(db, 'chats', userId, 'messages');
    const q = query(messagesRef, orderBy('createdAt', 'asc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const msgs = [];
      querySnapshot.forEach(doc => {
        msgs.push({ id: doc.id, ...doc.data() });
      });
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, []);

  // Gửi tin nhắn
  const sendMessage = async () => {
    if (!inputText.trim()) return;

    try {
      const messagesRef = collection(db, 'chats', userId, 'messages');
      await addDoc(messagesRef, {
        text: inputText.trim(),
        createdAt: serverTimestamp(),
        userId
      });

      // Xóa nội dung ô nhập sau khi gửi
      setInputText('');
    } catch (error) {
      console.error("Lỗi gửi tin nhắn:", error);
    }
  };

  // Hiển thị mỗi tin nhắn
  const renderItem = ({ item }) => (
    <View
      style={{
        backgroundColor: item.userId === userId ? '#DCF8C6' : '#FFF',
        alignSelf: item.userId === userId ? 'flex-end' : 'flex-start',
        padding: 10,
        borderRadius: 8,
        marginVertical: 4,
        maxWidth: '70%'
      }}
    >
      <Text>{item.text}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, padding: 10 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />

      <View style={{ flexDirection: 'row', marginTop: 10 }}>
        <TextInput
          value={inputText}
          onChangeText={setInputText}
          placeholder="Nhập tin nhắn..."
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 20,
            paddingHorizontal: 12,
            paddingVertical: 8,
            backgroundColor: '#fff'
          }}
        />
        <Button title="Gửi" onPress={sendMessage} />
      </View>
    </KeyboardAvoidingView>
  );
}
