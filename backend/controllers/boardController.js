const Board = require("../models/Board");

exports.createBoard = async (req, res) => {
  const { title } = req.body;
  try {
    const board = await Board.create({ title, user: req.user.id });
    res.status(201).json(board);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getBoards = async (req, res) => {
  try {
    const boards = await Board.find({ user: req.user.id });
    res.json(boards);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateBoard = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  try {
    const updatedBoard = await Board.findByIdAndUpdate(
      id,
      { title },
      { new: true }
    );
    if (!updatedBoard) {
      return res.status(404).json({ message: "Board not found" });
    }
    res.json(updatedBoard);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteBoard = async (req, res) => {
  console.log("User   ID:", req.user.id);
  try {
    const board = await Board.findById(req.params.id);
    if (!board) return res.status(404).json({ message: "Board not found" });

    console.log("Board User ID:", board.user.toString());

    if (board.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await board.deleteOne();
    res.json({ message: "Board removed" });
  } catch (error) {
    console.error("Error deleting board:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getBoardsByDate = async (req, res) => {
  const { startDate, endDate } = req.query;
  const dateFilter = {};

  if (startDate) {
    dateFilter.$gte = new Date(startDate);
  }
  if (endDate) {
    dateFilter.$lte = new Date(endDate);
  }

  try {
    const boards = await Board.find({
      user: req.user.id,
      createdAt: dateFilter,
    });
    res.status(200).json(boards);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch boards" });
  }
};
