const express = require('express');
const { createTask, getTasksByBoard, deleteTask } = require('../controllers/taskController');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.post('/', authenticate, createTask);
router.get('/boards/:boardId', authenticate, getTasksByBoard);  
router.delete('/:id', authenticate, deleteTask)

module.exports = router;
