import { Dimensions, StyleSheet } from "react-native";

const windowWidth = Dimensions.get("window").width;

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
    borderRadius: 8,
    width: (windowWidth - 60) / 2,
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

export default styles;
