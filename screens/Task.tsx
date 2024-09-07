import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { updateTask, deleteTask } from "../model/tasks";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "../style/Task";
import moment from "moment";

export default function Task({ route }) {
  const { task } = route.params;
  const [editedTask, setEditedTask] = useState(task);
  const navigation = useNavigation();

  const handleSave = async () => {
    if (!editedTask.title.trim()) {
      showAlert("Atenção", "Por favor, preencha o campo Título.");
      return;
    }

    try {
      const rowsAffected = await updateTask(editedTask);
      if (rowsAffected > 0) {
        console.log("Tarefa atualizada com sucesso:", editedTask);
        navigation.goBack();
      } else {
        console.error("Nenhuma tarefa foi atualizada.");
      }
    } catch (error) {
      console.error("Erro ao salvar a tarefa:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTask(editedTask.id);
      console.log("Tarefa excluída com sucesso.");
      navigation.goBack();
    } catch (error) {
      console.error("Erro ao excluir a tarefa:", error);
    }
  };

  const handleInputChange = (field, value) => {
    const updatedTask = { ...editedTask, [field]: value };
    setEditedTask(updatedTask);
  };

  const handleCompleteTask = async () => {
    const updatedTask = { ...editedTask, status: "Concluída" };
    try {
      const rowsAffected = await updateTask(updatedTask);
      if (rowsAffected > 0) {
        console.log("Tarefa concluída com sucesso:", updatedTask);
        setEditedTask(updatedTask);
        navigation.goBack();
      } else {
        console.error("Não foi possível concluir a tarefa.");
      }
    } catch (error) {
      console.error("Erro ao concluir a tarefa:", error);
    }
  };

  const showAlert = (title, message) => {
    Alert.alert(title, message);
  };

  const handleDeadlineChange = (text) => {    
    const formattedDate = moment(text, 'DDMMYYYY', true).isValid()
    ? moment(text, 'DD/MM/YYYY').format('DD/MM/YYYY')
    : text;


    setEditedTask((prev) => ({
      ...prev,
      deadline: formattedDate,
    }));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titleInput}>Título:</Text>
      {editedTask.status === "Aberta" ? (
        <TextInput
          style={styles.input}
          editable={true}
          value={editedTask.title}
          onChangeText={(text) => handleInputChange("title", text)}
        />
      ) : (
        <Text style={[styles.input, { color: "black" }]}>
          {editedTask.title}
        </Text>
      )}

      <Text style={styles.titleInput}>Descrição:</Text>
      {editedTask.status === "Aberta" ? (
        <TextInput
          style={[styles.input, { height: 100 }]}
          multiline={true}
          numberOfLines={4}
          editable={true}
          value={editedTask.description}
          onChangeText={(text) => handleInputChange("description", text)}
        />
      ) : (
        <Text style={[styles.input, { color: "black", height: 100 }]}>
          {editedTask.description}
        </Text>
      )}
      <Text style={styles.titleInput}>Data de abertura:</Text>
      <TextInput editable={false} style={styles.input}>{editedTask.openedDate}</TextInput>
      <Text style={styles.titleInput}>Prazo:</Text>
      {editedTask.status === "Aberta" ? (
        <TextInput
        style={styles.input}
        placeholder="Editar o prazo"
        value={editedTask.deadline}
        onChangeText={handleDeadlineChange}
      />
      ) : (
        <Text style={[styles.input, { color: "black" }]}>
          {editedTask.deadline}
        </Text>
      )}

      <Text style={styles.titleInput}>Aberto por:</Text>
      <TextInput editable={false} style={styles.input}>{editedTask.createdBy.toUpperCase()}</TextInput>

      <Text style={styles.titleInput}>Status:</Text>
      <TextInput editable={false} style={styles.input}>{editedTask.status}</TextInput>

      {editedTask.status === "Concluída" ? (
        <TouchableOpacity
          style={[styles.button, styles.deleteButtonFullWidth]}
          onPress={handleDelete}
        >
          <Text style={styles.buttonText}>Excluir Tarefa</Text>
          <Icon name="trash" size={20} color="#fff" />
        </TouchableOpacity>
      ) : (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.saveButton]}
            onPress={handleSave}
          >
            <Text style={styles.buttonText}>Salvar</Text>
            <Icon name="save" size={20} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.completeButton]}
            onPress={handleCompleteTask}
          >
            <Text style={styles.buttonText}>Concluir</Text>
            <Icon name="check-circle" size={20} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.deleteButton]}
            onPress={handleDelete}
          >
            <Text style={styles.buttonText}>Excluir</Text>
            <Icon name="trash" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}