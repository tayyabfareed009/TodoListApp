
## 📝 MyTodo List App

A simple **Todo List Application** built using **React Native**, **Node.js (Express)**, and **MySQL** (via XAMPP).
This app allows users to add, fetch, update, and delete tasks — helping manage daily activities efficiently.

---

## 🚀 Features

* ➕ Add new tasks
* 🔄 Fetch existing tasks from the database
* ✅ Mark tasks as done or ⏳ pending
* 🗑️ Delete tasks permanently
* 🧠 Clean UI & connected backend
* 📦 REST API powered by Express.js

---

## 🧰 Tech Stack

| Layer        | Technology           |
| ------------ | -------------------- |
| **Frontend** | React Native (Expo)  |
| **Backend**  | Node.js + Express.js |
| **Database** | MySQL (via XAMPP)    |
| **API Type** | REST API (Fetch)     |

---

## ⚙️ Setup Overview

1. **Backend:**

   * Built using Node.js & Express.js
   * Connects to MySQL database through XAMPP
   * Exposes API endpoints for CRUD operations

2. **Database:**

   * Database Name: `todo_db`
   * Table Name: `todos`
   * Columns:

     * `id` (INT, Primary Key, Auto Increment)
     * `task` (VARCHAR)
     * `done` (BOOLEAN, Default 0)

3. **Frontend:**

   * Built with React Native (Expo)
   * Communicates with backend via Fetch API
   * Supports task add, update, and delete

---

## 🧠 API Endpoints Summary

| Method | Endpoint     | Description                |
| ------ | ------------ | -------------------------- |
| GET    | `/todos`     | Fetch all tasks            |
| POST   | `/todos`     | Add a new task             |
| PUT    | `/todos/:id` | Update task (done/pending) |
| DELETE | `/todos/:id` | Delete a task              |

---

## 🧩 How It Works

1. User adds a task → sent to Node.js server → saved in MySQL
2. User clicks “Fetch Tasks” → retrieves data from backend
3. Task status toggles (Done / Pending) with one tap
4. Tasks can be deleted instantly with 🗑️

---

## 📱 Project Flow

React Native (Frontend) ↔ Express.js (Backend) ↔ MySQL (Database)

---

## 🧑‍💻 Developer

**👨 Malik Tayyab Fareed**
📍 Islamabad & Murree
🎓 Software Engineer
💻 Skills: Java, React Native, Node.js, MySQL

---

## ⭐ Project Highlights

* Simple UI with full CRUD support
* Perfect for learning full-stack mobile development
* Demonstrates integration of mobile frontend with backend API and SQL database

---

Would you like me to make this even **shorter (like a one-page GitHub overview)** or keep this **medium-length professional version**?
