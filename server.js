const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

const port = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Chuyển hướng từ '/' tới trang Google Sheets
app.get('/', (req, res) => {
  res.redirect('https://docs.google.com/spreadsheets/d/1YsT6ByxNGYZ9db1IRbucPHfD4kTY2DVo9aOiWzZIgNA/edit?usp=sharing');
});

// Endpoint GET /submit để trả về thông báo khi người dùng truy cập bằng GET
app.get('/submit', (req, res) => {
  res.send('This endpoint is for POST requests only. Please submit data using POST.');
});

// Endpoint POST để nhận dữ liệu và gửi đến Google Sheets
app.post('/submit', async (req, res) => {
  try {
    const response = await axios.post('https://script.google.com/macros/s/AKfycbyfMMwAq8O2L-qBRAsHJN-k8pRCEeRgmLL7Yl46XWE6-xx-a-knQH3MI5sE7PxZQWAnCw/exec', req.body);
    res.status(response.status).send(response.data);
  } catch (error) {
    console.error('Error occurred:', error.message);
    res.status(error.response?.status || 500).send(error.message);
  }
});

// Khởi chạy server
app.listen(port, () => {
  console.log(`Proxy server running at http://localhost:${port}`);
});
