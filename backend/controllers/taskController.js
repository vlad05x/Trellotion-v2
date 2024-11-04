const Task = require("../models/Task");

exports.createTask = async (req, res) => {
  const { title, description, boardId } = req.body;
  try {
    
    const newTask = new Task({ title, description, boardId });
    await newTask.save();
    console.log("Task created:", newTask);
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ error: "Failed to create task" });
  }
};

exports.getTasksByBoard = async (req, res) => {
  try {
    const { boardId } = req.params;
    const tasks = await Task.find({ boardId });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};
