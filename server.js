const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Route cho GET request tại đường dẫn gốc
app.get('/', (req, res) => {
  res.redirect('/submit');
});

// Endpoint để nhận dữ liệu và gửi đến Google Sheets
app.post('/submit', async (req, res) => {
  try {
    const response = await axios.post(
      'https://script.google.com/macros/s/AKfycbyfMMwAq8O2L-qBRAsHJN-k8pRCEeRgmLL7Yl46XWE6-xx-a-knQH3MI5sE7PxZQWAnCw/exec',
      req.body
    );
    res.status(response.status).send(response.data);
  } catch (error) {
    console.error('Error occurred:', error);
    res.status(error.response?.status || 500).send(error.message);
  }
});

// Khởi chạy server
app.listen(port, () => {
  console.log(`Proxy server running at http://localhost:${port}`);
});
