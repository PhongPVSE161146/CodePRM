// // ChatScreen.js
// import React, { useEffect, useState, useRef } from 'react';
// import { View, TextInput, Button, FlatList, Text, KeyboardAvoidingView, Platform } from 'react-native';
// import { initializeApp } from 'firebase/app';
// import { getFirestore, collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';

// // Firebase config của bạn
// const firebaseConfig = {
//   // ... điền thông tin firebase config của bạn ...
// };

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// const userId = 'user123'; // lấy user id thực tế từ auth

// export default function ChatScreen() {
//   const [messages, setMessages] = useState([]);
//   const [inputText, setInputText] = useState('');
//   const flatListRef = useRef();

//   useEffect(() => {
//     const messagesRef = collection(db, 'chats', userId, 'messages');
//     const q = query(messagesRef, orderBy('createdAt', 'asc'));

//     const unsubscribe = onSnapshot(q, (querySnapshot) => {
//       let msgs = [];
//       querySnapshot.forEach(doc => {
//         msgs.push({ id: doc.id, ...doc.data() });
//       });
//       setMessages(msgs);
//     });

//     return () => unsubscribe();
//   }, []);

//   const sendMessage = async () => {
//     if (inputText.trim().length === 0) return;

//     try {
//       const messagesRef = collection(db, 'chats', userId, 'messages');
//       await addDoc(messagesRef, {
//         text: inputText,
//         createdAt: serverTimestamp(),
//         userId: userId,
//       });
//       setInputText('');
//     } catch (error) {
//       console.error("Lỗi gửi tin nhắn: ", error);
//     }
//   };

//   const renderItem = ({ item }) => (
//     <View style={{
//       backgroundColor: item.userId === userId ? '#DCF8C6' : '#FFF',
//       alignSelf: item.userId === userId ? 'flex-end' : 'flex-start',
//       padding: 10,
//       borderRadius: 8,
//       marginVertical: 4,
//       maxWidth: '70%'
//     }}>
//       <Text>{item.text}</Text>
//     </View>
//   );

//   return (
//     <KeyboardAvoidingView
//       style={{ flex: 1, padding: 10 }}
//       behavior={Platform.OS === "ios" ? "padding" : undefined}
//       keyboardVerticalOffset={90}
//     >
//       <FlatList
//         ref={flatListRef}
//         data={messages}
//         renderItem={renderItem}
//         keyExtractor={item => item.id}
//         onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
//         onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
//       />

//       <View style={{ flexDirection: 'row', marginTop: 10 }}>
//         <TextInput
//           value={inputText}
//           onChangeText={setInputText}
//           placeholder="Nhập tin nhắn..."
//           style={{
//             flex: 1,
//             borderWidth: 1,
//             borderColor: '#ccc',
//             borderRadius: 20,
//             paddingHorizontal: 12,
//             paddingVertical: 8,
//           }}
//         />
//         <Button title="Gửi" onPress={sendMessage} />
//       </View>
//     </KeyboardAvoidingView>
//   );
// }
s