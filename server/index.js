require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const connectDB = require('./config/db');

const app = express();

app.use(cors());

connectDB();

app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API is running'));
app.use('/api/users', require('./routes/Users'));
app.use('/api/auth', require('./routes/Auth'));
app.use('/api/post', require('./routes/Post'));

const server = http.createServer(app);

const PORT = process.env.PORT || '5000';

server.listen(PORT, () => console.log('App running on port:' + PORT));
