import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {Text, TextInput, TouchableOpacity, ScrollView, Alert,} from "react-native";
import { addTask } from "../model/tasks";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import styles from "../style/CreateTask";

export default function CreateTask() {
  const navigation = useNavigation();
  const [title, setTitle] = useState("");
  const [openedDate, setOpenedDate] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [deadline, setDeadline] = useState("");
  const [status] = useState("Aberta");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const currentDate = moment().format("DD/MM/YYYY");
    setOpenedDate(currentDate);

    const getUsername = async () => {
      try {
        const username = await AsyncStorage.getItem("username");
        setCreatedBy(username);
      } catch (error) {
        console.error("Erro ao obter o nome de usuário:", error);
      }
    };

    getUsername();
  }, []);

  const handleSaveTask = async () => {
    if (!title.trim()) {
      showAlert("Atenção", "Por favor, preencha o campo Título.");
      return;
    }

    try {
      await addTask(
        title,
        openedDate,
        createdBy,
        deadline,
        status,
        description
      );
      navigation.goBack();
    } catch (error) {
      console.error("Erro ao salvar a tarefa:", error);
    }
  };

  const showAlert = (title, message) => {
    Alert.alert(title, message);
  };

  const handleDeadlineChange = (text) => {
    const formattedDate = moment(text, 'DDMMYYYY', true).isValid()
      ? moment(text, 'DD/MM/YYYY').format('DD/MM/YYYY')
      : text;

    setDeadline(formattedDate);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>Criar Nova Tarefa</Text>
      <TextInput
        style={styles.input}
        placeholder="Título"
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Prazo DDMMAAAA"
        value={deadline}
        onChangeText={handleDeadlineChange}
      />
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Descrição"
        multiline={true}
        numberOfLines={4}
        value={description}
        onChangeText={(text) => setDescription(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Data de Abertura (DD/MM/AAAA)"
        value={openedDate}
        onChangeText={(text) => setOpenedDate(text)}
        editable={false}
      />
      <TextInput
        style={styles.input}
        placeholder="Criado por"
        value={createdBy}
        onChangeText={(text) => setCreatedBy(text)}
        editable={false}
      />
      <TouchableOpacity style={styles.button} onPress={handleSaveTask}>
        <Text style={styles.buttonText}>Salvar Tarefa</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}