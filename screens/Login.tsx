import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  Switch,
} from "react-native";
import logo from "../assets/inicio.png";
import { authenticateUser } from "../model/authenticateUser";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 40,
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
    alignSelf: "center",
  },
  footer: {
    position: "absolute",
    bottom: 20,
  },
  input: {
    width: "75%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  button: {
    width: "75%",
    backgroundColor: "#f49c4c",
    paddingVertical: 15,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
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
  savePasswordContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
});
