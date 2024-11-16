const Task = require("../models/Task");
const Board = require("../models/Board");

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

exports.updateTaskStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const task = await Task.findById(id);

    if (!task) return res.status(404).json({ message: "Task not found" });
    if (task.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    if (!["To Do", "In Progress", "Completed"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    task.status = status;
    task.updatedAt = Date.now();
    await task.save();

    res.json(task);
  } catch (error) {
    console.error("Error updating task status:", error);
    res.status(500).json({ message: error.message || "Server error" });
  }
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, boardId } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, boardId },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
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

exports.getTasksByFilters = async (req, res) => {
  const { status, startDate, endDate } = req.query;
  const filter = {};

  if (status) {
    filter.status = status; 
  }

  if (startDate && endDate) {
    filter.dateCreated = {
      $gte: new Date(startDate),
      $lte: new Date(endDate), 
    };
  }

  try {
    const tasks = await Task.find(filter); 
    res.json(tasks); 
  } catch (error) {
    console.error("Error filtering tasks:", error);
    res.status(500).json({ message: "Server error" });
  }
};
