const express = require('express');
const { createBoard, getBoards, deleteBoard } = require('../controllers/boardController');
const { authenticate } = require('../middleware/auth'); 

const router = express.Router();

router.post('/', authenticate, createBoard); 
router.get('/', authenticate, getBoards); 
router.delete('/:id', authenticate, deleteBoard); 

module.exports = router;
