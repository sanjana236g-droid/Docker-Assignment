const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Points to the backend service name defined in docker-compose.yml
const BACKEND_URL = process.env.BACKEND_URL || 'http://backend:5000';

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/submit', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const response = await axios.post(`${BACKEND_URL}/submit`, {
      name,
      email,
      message
    });
    res.render('result', { data: response.data });
  } catch (error) {
    res.render('result', { 
      data: { status: 'error', message: 'Failed to communicate with the Flask backend.' } 
    });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Frontend running on port ${PORT}`);
});