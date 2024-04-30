import React, { useState } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { setupTasksTable, getAllTasks } from "../model/tasks";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../style/Tasks";

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

  const renderTaskItem = ({ item, index }) => {
    if (
      (showCompleted && item.status !== "Concluída") ||
      (!showCompleted && item.status === "Concluída")
    ) {
      return null;
    }

    const columnIndex = index % 2;
    const rowIndex = Math.floor(index / 2);

    const itemStyle = {
      marginLeft: columnIndex === 0 ? 0 : 20,
      marginTop: rowIndex === 0 ? 0 : 20,
    };

    return (
      <TouchableOpacity
        style={[styles.taskItem, itemStyle]}
        onPress={() => navigation.navigate("Task", { task: item })}
      >
        <Text style={styles.taskText}>{item.openedDate}</Text>
        <Text style={[styles.taskText, styles.taskTitle]}>{item.title}</Text>
        <Text style={styles.taskText}>Prazo: {item.deadline}</Text>
        <Text style={styles.taskText}>{item.status}</Text>
      </TouchableOpacity>
    );
  };

  const sortedTasks = tasks.filter((item) => {
    if (showCompleted) {
      return item.status === "Concluída";
    } else {
      return item.status !== "Concluída";
    }
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={sortedTasks}
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
