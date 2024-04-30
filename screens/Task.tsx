import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { updateTask, deleteTask } from "../model/tasks";
import { useNavigation } from "@react-navigation/native";

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

  const showAlert = (title, message) => {
    Alert.alert(title, message);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titleInput}>Título:</Text>
      <TextInput
        style={styles.input}
        value={editedTask.title}
        onChangeText={(text) => handleInputChange("title", text)}
      />

      <Text style={styles.titleInput}>Descrição:</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        multiline={true}
        numberOfLines={4}
        value={editedTask.description}
        onChangeText={(text) => handleInputChange("description", text)}
      />

      <Text style={styles.titleInput}>Data de abertura:</Text>
      <TextInput
        style={styles.input}
        value={editedTask.openedDate}
        onChangeText={(text) => handleInputChange("openedDate", text)}
      />

      <Text style={styles.titleInput}>Prazo:</Text>
      <TextInput
        style={styles.input}
        value={editedTask.deadline}
        onChangeText={(text) => handleInputChange("deadline", text)}
      />

      <Text style={styles.titleInput}>Aberto por:</Text>
      <Text style={styles.input}>{editedTask.createdBy}</Text>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.buttonText}>Excluir Tarefa</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  titleInput: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    fontSize: 16,
    marginBottom: 15,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: "#f49c4c",
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  deleteButton: {
    backgroundColor: "#ff3333",
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
});
