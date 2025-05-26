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

import {
  getAuth,
  onAuthStateChanged
} from 'firebase/auth';

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCmhFY91oRVB-4kzVNOftChOdJ78XZbJ_I",
  authDomain: "systemmobile1.firebaseapp.com",
  projectId: "systemmobile1",
  storageBucket: "systemmobile1.appspot.com",
  messagingSenderId: "780547792146",
  appId: "1:780547792146:web:54bd3868d147318b7727cb",
  measurementId: "G-7Z0MSP9QR2"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export default function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [userId, setUserId] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const flatListRef = useRef();
  const lastSendTimeRef = useRef(0);

  // Lấy user từ Firebase Auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        console.warn('Chưa đăng nhập!');
      }
    });
    return () => unsubscribe();
  }, []);

  // Lắng nghe tin nhắn
  useEffect(() => {
    if (!userId) return;

    const messagesRef = collection(db, 'chats', userId, 'messages');
    const q = query(messagesRef, orderBy('createdAt', 'asc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [userId]);

  // Tạo phản hồi bot
  const generateBotReply = (message) => {
    const lower = message.toLowerCase();
    if (lower.includes('xin chào')) return 'Chào bạn! Mình là chatbot 🤖';
    if (lower.includes('em là ai')) return 'Mình là bot được lập trình để phản hồi bạn.';
    if (lower.includes('hello') || lower.includes('hi')) return 'Hello! Mình có thể giúp gì cho bạn?';
    return `Bạn vừa nói: "${message}" — nghe thú vị đó!`;
  };

  const sendMessage = async () => {
    const now = Date.now();
    if (!inputText.trim() || !userId || isSending || now - lastSendTimeRef.current < 500) return;

    setIsSending(true);
    lastSendTimeRef.current = now;
    const userMessage = inputText.trim();
    setInputText('');

    try {
      const messagesRef = collection(db, 'chats', userId, 'messages');

      // Gửi tin nhắn người dùng
      await addDoc(messagesRef, {
        text: userMessage,
        createdAt: serverTimestamp(),
        userId: userId,
        sender: 'user'
      });

      // Bot trả lời sau 1 giây
      setTimeout(async () => {
        try {
          const botReply = generateBotReply(userMessage);
          await addDoc(messagesRef, {
            text: botReply,
            createdAt: serverTimestamp(),
            userId: 'BOT',
            sender: 'bot'
          });
        } catch (botError) {
          console.error("Lỗi phản hồi bot:", botError.message);
        }
      }, 1000);

    } catch (error) {
      console.error("Lỗi gửi tin nhắn:", error.message);
    } finally {
      setIsSending(false);
    }
  };

  const renderItem = ({ item }) => {
    const isUser = item.userId === userId;
    const isBot = item.userId === 'BOT';

    return (
      <View
        style={{
          backgroundColor: isUser ? '#DCF8C6' : isBot ? '#F1F0F0' : '#FFF',
          alignSelf: isUser ? 'flex-end' : 'flex-start',
          padding: 10,
          borderRadius: 8,
          marginVertical: 4,
          maxWidth: '70%'
        }}
      >
        <Text>{item.text}</Text>
      </View>
    );
  };

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
        keyboardShouldPersistTaps="handled"
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
           onSubmitEditing={sendMessage} 
        />
        
        <Button title="Gửi" onPress={sendMessage} disabled={isSending || !userId} />
      </View>
    </KeyboardAvoidingView>
  );
}
