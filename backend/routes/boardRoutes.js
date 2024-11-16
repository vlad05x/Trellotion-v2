const express = require('express');
const { createBoard, getBoards, updateBoard, deleteBoard, getBoardsByDate } = require('../controllers/boardController');
const { authenticate } = require('../middleware/auth'); 

const router = express.Router();

router.post('/', authenticate, createBoard); 
router.get('/', authenticate, getBoards); 
router.put('/:id', authenticate, updateBoard);
router.delete('/:id', authenticate, deleteBoard); 
router.get('/filter', authenticate, getBoardsByDate);

module.exports = router;
