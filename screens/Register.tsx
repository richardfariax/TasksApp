import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { registerUser } from "../model/registerUser";
import styles from "../style/Register";
import { Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, View, FlatList } from "react-native";
import moment from "moment";

export default function Register() {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [emailSuggestions, setEmailSuggestions] = useState([]);

  const emailDomains = ["@gmail.com", "@hotmail.com", "@yahoo.com", "@outlook.com"];

  const handleRegister = async () => {
    if (!username || !email || !cpf || !dob || !password) {
      setErrorMessage("Todos os campos são obrigatórios.");
      return;
    }

    try {
      await registerUser(username, email, password, dob, cpf);
      navigation.navigate("Login" as never);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleDate = (text) => {
    const formattedDate = moment(text, "DDMMYYYY", true).isValid()
      ? moment(text, "DD/MM/YYYY").format("DD/MM/YYYY")
      : text;

    setDob(formattedDate);
  };

  const handleCpf = (text) => {
    const numericText = text.replace(/\D/g, "");
    const formattedCpf = numericText
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    setCpf(formattedCpf);
  };

  const handleEmail = (text) => {
    setEmail(text);

    if (text.includes("@")) {
      setEmailSuggestions([]);
      return;
    }

    const suggestions = emailDomains.map((domain) => text + domain);
    setEmailSuggestions(suggestions);
  };

  const applyEmailSuggestion = (suggestion) => {
    setEmail(suggestion);
    setEmailSuggestions([]);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Text style={styles.title}>Criando uma conta</Text>

      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}

      <TextInput
        style={styles.input}
        placeholder="Nome de Usuário"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        keyboardType="email-address"
        inputMode="email"
        value={email}
        onChangeText={handleEmail}
      />

      {emailSuggestions.length > 0 && (
        <View style={styles.suggestionList}>
          <FlatList
            data={emailSuggestions}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => applyEmailSuggestion(item)}>
                <Text style={styles.suggestionText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}

      <TextInput
        style={styles.input}
        placeholder="CPF"
        maxLength={14}
        keyboardType="numeric"
        value={cpf}
        onChangeText={handleCpf}
      />
      <TextInput
        style={styles.input}
        placeholder="Data de Nascimento (DD/MM/AAAA)"
        value={dob}
        onChangeText={handleDate}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}