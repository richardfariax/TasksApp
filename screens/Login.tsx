import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import logo from "../assets/logo.webp";
import { authenticateUser } from "../model/authenticateUser";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const isAuthenticated = await authenticateUser(username, password);
      if (isAuthenticated) {
        await AsyncStorage.setItem('username', username);
        navigation.navigate("Tasks" as never);
      } else {
        setError("Usuário ou senha incorretos");
      }
    } catch (error) {
      console.error("Erro ao autenticar usuário:", error);
    }
  };

  const handleRegister = () => {
    navigation.navigate("Register" as never);
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.title}>Bem vindo de volta!</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome de Usuário"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.footer} onPress={handleRegister}>
        <Text style={styles.TextRecover}>Primeiro acesso?</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  footer: {
    position: "absolute",
    bottom: 20,
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    width: 128,
    backgroundColor: "#f49c4c",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
  TextRecover: {
    color: "#f49c4c",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "#ff0000",
    marginBottom: 8,
    fontSize: 16,
  },
});
