import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  Switch,
} from "react-native";
import logo from "../assets/inicio.png";
import { authenticateUser } from "../model/authenticateUser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../style/Login";


export default function Login() {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [savePassword, setSavePassword] = useState(false);

  useEffect(() => {
    const loadSavedCredentials = async () => {
      try {
        const savedUsername = await AsyncStorage.getItem("username");
        const savedPassword = await AsyncStorage.getItem("password");

        if (savedUsername) {
          setUsername(savedUsername);
        }
        if (savedPassword) {
          setPassword(savedPassword);
          setSavePassword(true);
        }
      } catch (error) {
        console.error("Error loading saved credentials:", error);
      }
    };

    loadSavedCredentials();
  }, []);

  const handleLogin = async () => {
    try {
      const isAuthenticated = await authenticateUser(username, password);
      if (isAuthenticated) {
        await AsyncStorage.setItem("username", username);
        if (savePassword) {
          await AsyncStorage.setItem("password", password);
        } else {
          await AsyncStorage.removeItem("password");
        }
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

  const toggleSavePassword = () => {
    setSavePassword((prev) => !prev);
  };

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        padding: 20,
      }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
    <Image source={logo} style={styles.logo} />

      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20, marginTop: -40, color: "#333" }}>
        Bem vindo de volta!
      </Text>
      <TextInput
        style={{
          width: "100%",
          height: 50,
          borderColor: "#ddd",
          borderWidth: 1,
          borderRadius: 10,
          paddingHorizontal: 15,
          marginBottom: 15,
          backgroundColor: "#fff",
          fontSize: 16,
        }}
        placeholder="Nome de Usuário"
        value={username}
        onChangeText={(text) => setUsername(text)}
        autoCapitalize="none"
      />
      <TextInput
        style={{
          width: "100%",
          height: 50,
          borderColor: "#ddd",
          borderWidth: 1,
          borderRadius: 10,
          paddingHorizontal: 15,
          marginBottom: 15,
          backgroundColor: "#fff",
          fontSize: 16,
        }}
        placeholder="Senha"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      {error ? <Text style={{ color: "red", marginBottom: 10 }}>{error}</Text> : null}
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
        <Text style={{ fontSize: 16 }}>Salvar senha?</Text>
        <Switch
          value={savePassword}
          onValueChange={toggleSavePassword}
          style={{ marginLeft: 10 }}
        />
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: "#4CAF50",
          paddingVertical: 15,
          paddingHorizontal: 80,
          borderRadius: 10,
          marginBottom: 15,
          width: "100%",
          alignItems: "center",
        }}
        onPress={handleLogin}
      >
        <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleRegister}>
        <Text style={{ color: "#1E90FF", fontSize: 16 }}>Primeiro acesso?</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}