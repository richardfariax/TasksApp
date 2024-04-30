import React, { useState } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Button,
} from "react-native";
import { setupTasksTable, getAllTasks } from "../model/tasks";
import AsyncStorage from "@react-native-async-storage/async-storage";

const windowWidth = Dimensions.get("window").width;

export default function Tasks() {
  const navigation = useNavigation();
  const [tasks, setTasks] = useState([]);
  const [showCompleted, setShowCompleted] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const loadTasks = async () => {
        try {
          const currentUser = await AsyncStorage.getItem("username");
          const tasksFromDB = await getAllTasks(currentUser);
          setTasks(tasksFromDB);
        } catch (error) {
          console.error("Erro ao carregar as tarefas:", error);
        }
      };
      setupTasksTable();
      loadTasks();
      return () => {};
    }, [])
  );

  const handleCreateTask = () => {
    navigation.navigate("CreateTask");
  };

  const toggleShowCompleted = () => {
    setShowCompleted(!showCompleted);
  };

  const renderTaskItem = ({ item }) => {
    if (showCompleted && item.status !== "Concluída") {
      return null;
    }
    if (!showCompleted && item.status === "Concluída") {
      return null;
    }

    return (
      <TouchableOpacity
        style={styles.taskItem}
        onPress={() => navigation.navigate("Task", { task: item })}
      >
        <Text style={styles.taskText}>{item.openedDate}</Text>
        <Text style={[styles.taskText, styles.taskTitle]}>{item.title}</Text>
        <Text style={styles.taskText}>Prazo: {item.deadline}</Text>
        <Text style={styles.taskText}>{item.status}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        renderItem={renderTaskItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.taskList}
        numColumns={2}
      />
      
      <TouchableOpacity style={styles.button} onPress={handleCreateTask}>
        <Text style={styles.buttonText}>Criar Tarefa</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.filterButton}
        onPress={toggleShowCompleted}
      >
        <Text style={styles.filterButtonText}>
          {showCompleted ? "Mostrar Abertas" : "Mostrar Concluídas"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  filterButton: {
    backgroundColor: "#8a8a8a",
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  filterButtonText: {
    color: "#ffffff",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
  taskList: {
    flexGrow: 1,
  },
  taskItem: {
    backgroundColor: "#f0f0f0",
    padding: 15,
    marginBottom: 20,
    borderRadius: 8,
    width: (windowWidth - 60) / 2,
    marginRight: 20,
    alignItems: "flex-start",
  },
  taskText: {
    fontSize: 16,
    marginBottom: 5,
  },
  button: {
    width: "100%",
    backgroundColor: "#f49c4c",
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 8,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
  taskTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
  },
});
