const Task = require("../models/Task");
const Board = require("../models/Board"); // Импортируем модель Board

exports.createTask = async (req, res) => {
  const { title, description, boardId } = req.body;
  try {
    const board = await Board.findById(boardId);
    if (!board) {
      return res.status(404).json({ error: "Board not found" });
    }

    const newTask = new Task({
      title,
      description,
      boardId,
      user: req.user.id,
    });
    await newTask.save();
    console.log("Task created:", newTask);
    res.status(201).json(newTask);
  } catch (err) {
    console.error("Error creating task:", err);
    res.status(500).json({ error: err.message || "Failed to create task" });
  }
};

exports.getTasksByBoard = async (req, res) => {
  try {
    const { boardId } = req.params;
    const tasks = await Task.find({ boardId, user: req.user.id });
    // Убедимся, что возвращаем массив
    res.status(200).json(tasks || []);
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (task.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await task.deleteOne();
    res.json({ message: "Task removed" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: error.message || "Server error" });
  }
};
