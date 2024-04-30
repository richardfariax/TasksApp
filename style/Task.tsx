import { StyleSheet } from "react-native";

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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  deleteButtonFullWidth: {
    backgroundColor: "#ff3333",
    width: "100%",
    marginTop: 20,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    width: "30%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
  },
  saveButton: {
    backgroundColor: "#f49c4c",
  },
  completeButton: {
    backgroundColor: "#4caf50",
  },
  deleteButton: {
    backgroundColor: "#ff3333",
  },
});

  
  export default styles;