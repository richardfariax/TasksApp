import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { updateTask, deleteTask } from "../model/tasks";
import { useNavigation } from "@react-navigation/native";

export default function Task({ route }) {
  const { task } = route.params;
  const [editedTask, setEditedTask] = useState(task);
  const navigation = useNavigation();

  const handleSave = async () => {
    try {
      const rowsAffected = await updateTask(editedTask);
      if (rowsAffected > 0) {
        console.log("Tarefa atualizada com sucesso:", editedTask);
        navigation.goBack();
      } else {
        console.error("Nenhuma tarefa foi atualizada.");
      }
    } catch (error) {
      console.error('Erro ao salvar a tarefa:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTask(editedTask.id); 
      console.log("Tarefa excluída com sucesso.");
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao excluir a tarefa:', error);
    }
  };

  const handleInputChange = (field, value) => {
    const updatedTask = { ...editedTask, [field]: value };
    setEditedTask(updatedTask);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.titleInput}>Título:</Text>
        <TextInput
          style={styles.input}
          value={editedTask.title}
          onChangeText={(text) => handleInputChange("title", text)}
        />

        <Text style={styles.titleInput}>Descrição:</Text>
        <TextInput
          style={styles.input}
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
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
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
    width: '100%',
    backgroundColor: '#f49c4c',
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  deleteButton: {
    backgroundColor: "#ff3333",
    width: '100%',
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
