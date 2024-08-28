const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

const port = process.env.PORT || 8080; 

app.use(cors({
  origin: 'https://hubsaigonquiz.netlify.app', 
  methods: ['GET', 'POST'],
}));

app.use(express.json());

// Chuyển hướng từ '/' sang '/submit'
app.get('/', (req, res) => {
  res.redirect('https://docs.google.com/spreadsheets/d/1YsT6ByxNGYZ9db1IRbucPHfD4kTY2DVo9aOiWzZIgNA/edit?usp=sharing');
});

// Endpoint GET /submit để trả về một thông báo
app.get('/submit', (req, res) => {
  res.send('This endpoint is for POST requests only. Please submit data using POST.');
});

// Endpoint POST để nhận dữ liệu và gửi đến Google Sheets
app.post('/submit', async (req, res) => {
  try {
    const response = await axios.post('https://script.google.com/macros/s/AKfycbyfMMwAq8O2L-qBRAsHJN-k8pRCEeRgmLL7Yl46XWE6-xx-a-knQH3MI5sE7PxZQWAnCw/exec', req.body);
    if (response.status === 200) {
      res.status(200).send({ message: 'Data successfully saved' });
    } else {
      res.status(response.status).send({ message: 'Failed to save data' });
    }
  } catch (error) {
    console.error('Error occurred:', error.message);
    res.status(error.response?.status || 500).send({ message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Proxy server running at http://localhost:${port}`);
});
