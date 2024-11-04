const express = require('express');
const connectDB = require('./config/datebase');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/boards', require('./routes/boardRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
