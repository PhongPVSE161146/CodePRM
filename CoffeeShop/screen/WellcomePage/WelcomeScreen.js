import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* <Image style={styles.image} source={require('../../img/logo.png')} /> */}
      <Text style={styles.title}>
        Welcome to <Text style={styles.brand}>COOFFEE SHOP</Text>
      </Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Login")}>
        <Text style={styles.buttonText}>Start with your email</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.footerText}>
          Already have an account? <Text style={styles.link}>Sign In</Text>
        </Text>
      </TouchableOpacity>
    </View>

  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", padding: 20, backgroundColor: "#fff" },
  image: { width: 260, height: 200, borderRadius: 10, marginBottom: 20 },
  title: { fontSize: 28, fontWeight: "bold", textAlign: "center" },
  brand: { color: "#FF5733" },
  subtitle: { fontSize: 16, textAlign: "center", color: "#666", marginVertical: 10 },
  button: { backgroundColor: "#FF5733", paddingVertical: 12, paddingHorizontal: 40, borderRadius: 8, marginTop: 10 },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  footerText: { marginTop: 20, fontSize: 14, color: "#666" },
  link: { color: "#FF5733", fontWeight: "bold" }
});
