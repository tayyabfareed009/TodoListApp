import { useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

export default function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    try {
      const response = await fetch("http://10.172.134.212:3000/todos",{
      method: "get"});
      if (!response.ok) throw new Error("Failed to fetch todos");
      const data = await response.json();
      setTodos(data);
    } catch (err) {
      console.error("Error fetching todos:", err);
      Alert.alert("Error", "Could not load tasks.");
    }
  };

  const addTask = async () => {
    if (task.trim() === "") return Alert.alert("Error", "Task cannot be empty!");

    try {
      const response = await fetch("http://10.172.134.212:3000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task }),
      });

      if (!response.ok) throw new Error("Failed to add todo");
      setTask("");
      Alert.alert("Success", "✅ Task added successfully!");
    } catch (err) {
      console.error("Error adding todo:", err);
      Alert.alert("Error", "Could not add task.");
    }
  };

  const deleteTodo = async (id) => {
  try {
    const response = await fetch(`http://10.172.134.212:3000/todos/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("Failed to delete todo");

    Alert.alert("Deleted", "🗑️ Task deleted successfully!");
    fetchTodos(); // Refresh list after deletion
  } catch (err) {
    console.error("Error deleting todo:", err);
    Alert.alert("Error", "Could not delete task.");
  }
};


  const toggleTask = async (id, currentStatus) => {
    try {
      const response = await fetch(`http://10.172.134.212:3000/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ done: !currentStatus }),
      });
      if (!response.ok) throw new Error("Failed to update todo");
      fetchTodos();
    } catch (err) {
      console.error("Error updating todo:", err);
      Alert.alert("Error", "Could not update task.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.heading}>📝 My Todo List</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your task..."
          value={task}
          onChangeText={setTask}
        />

        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonText}>＋ Add Task</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.fetchButton} onPress={fetchTodos}>
          <Text style={styles.fetchButtonText}>🔄 Fetch Tasks</Text>
        </TouchableOpacity>

        {todos.length === 0 ? (
          <Text style={styles.emptyText}>
            No tasks yet. Press "Fetch Tasks" or add a new one.
          </Text>
        ) : (
          <FlatList
           data={todos}
  keyExtractor={(item) => item.id.toString()}
  renderItem={({ item }) => (
    <View style={styles.todoBox}>
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={() => toggleTask(item.id, item.done)}
      >
        <Text
          style={[
            styles.todo,
            { textDecorationLine: item.done ? "line-through" : "none" },
          ]}
        >
          {item.task}
        </Text>
        <Text style={{ color: item.done ? "green" : "red" }}>
          {item.done ? "✅ Done" : "⏳ Pending"}
        </Text>
      </TouchableOpacity>

      {/* 🗑️ Delete Button */}
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteTodo(item.id)}
      >
        <Text style={styles.deleteButtonText}>🗑️</Text>
      </TouchableOpacity>
    </View>
  )}
/>

        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#fff",
    width: "90%",
    maxWidth: 450,
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  heading: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 10,
    backgroundColor: "#fafafa",
  },
  addButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  fetchButton: {
    backgroundColor: "#2196F3",
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  fetchButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  todoBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#eee",
  },
  todo: {
    fontSize: 18,
    color: "#333",
  },
  emptyText: {
    textAlign: "center",
    color: "gray",
    marginTop: 20,
    fontSize: 16,
  },
  deleteButton: {
  backgroundColor: "#e1ff4dff",
  padding: 10,
  borderRadius: 8,
  marginLeft: 10,
},
deleteButtonText: {
  color: "#fff",
  fontSize: 18,
  fontWeight: "bold",
},

});
