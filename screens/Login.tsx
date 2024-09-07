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
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Image source={logo} style={styles.logo} />
      <Text style={styles.title}>Bem vindo de volta!</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome de Usuário"
        value={username}
        onChangeText={(text) => setUsername(text)}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <View style={styles.savePasswordContainer}>
        <Text>Salvar senha?</Text>
        <Switch
          value={savePassword}
          onValueChange={toggleSavePassword}
          style={{ marginLeft: 10 }}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.footer} onPress={handleRegister}>
        <Text style={styles.TextRecover}>Primeiro acesso?</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}