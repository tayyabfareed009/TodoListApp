const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// ✅ Connect to MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "todo_db",
});

db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
    return;
  }
  console.log("✅ Connected to MySQL database");
});

// GET all todos
app.get("/todos", (req, res) => {
  db.query("SELECT * FROM todos", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// POST add a new todo
app.post("/todos", (req, res) => {
  const { task } = req.body;
  console.log("📩 Received new task:", task); // 👈 ADD THIS LINE

  if (!task) return res.status(400).json({ error: "Task is required" });

  db.query("INSERT INTO todos (task, done) VALUES (?, 0)", [task], (err, result) => {
    if (err) {
      console.error("❌ Error inserting task:", err);
      return res.status(500).json({ error: err.message });
    }
    console.log("✅ Task inserted successfully!");
    res.json({ id: result.insertId, task, done: 0 });
  });
});
// DELETE a todo
app.delete("/todos/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM todos WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Todo not found" });

    res.json({ message: "🗑️ Todo deleted successfully" });
  });
});



// PUT toggle done/undone
app.put("/todos/:id", (req, res) => {
  const { id } = req.params;
  const { done } = req.body;

  db.query("UPDATE todos SET done = ? WHERE id = ?", [done, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Todo updated successfully" });
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://10.172.134.212:${PORT}}`);
});
