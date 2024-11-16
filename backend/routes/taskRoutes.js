const express = require('express');
const { createTask, getTasksByBoard, updateTask, deleteTask, updateTaskStatus, getTasksByFilters } = require('../controllers/taskController');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.post('/', authenticate, createTask);
router.get('/boards/:boardId', authenticate, getTasksByBoard); 
router.put('/:id', authenticate, updateTask); 
router.put('/:id/status', authenticate, updateTaskStatus);
router.delete('/:id', authenticate, deleteTask)
router.get("/filter", authenticate, getTasksByFilters);

module.exports = router;
