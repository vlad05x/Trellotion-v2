const express = require('express');
const { createTask, getTasksByBoard } = require('../controllers/taskController');
const router = express.Router();

router.post('/', createTask);
router.get('/board/:boardId', getTasksByBoard);

module.exports = router;
