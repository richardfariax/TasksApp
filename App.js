import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screens/Login";
import Tasks from "./screens/Tasks";
import Task from "./screens/Task";
import Register from "./screens/Register";
import CreateTask from "./screens/CreateTask";
import { setupDatabase } from "./model/database";

const StackNavigation = createNativeStackNavigator();
setupDatabase();

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigation.Navigator initialRouteName="Login">
        <StackNavigation.Screen
          options={{ headerShown: false }}
          name="Login"
          component={Login}
        />
        <StackNavigation.Screen
          options={{animation: 'slide_from_bottom', title: "Tarefas" }}
          name="Tasks"
          component={Tasks}
        />
        <StackNavigation.Screen name="Task" component={Task} options={{animation: 'slide_from_bottom',}} />
        <StackNavigation.Screen
          name="Register"
          component={Register}
          options={{
            title: "",
          }}
        />
        <StackNavigation.Screen
          name="CreateTask"
          component={CreateTask}
          options={{
            animation: 'slide_from_bottom',
            title: "",
          }}
        />
      </StackNavigation.Navigator>
    </NavigationContainer>
  );
}
