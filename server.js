const express = require('express');
const cors = require('cors'); // Import the cors package
const axios = require('axios');
const app = express();
const port = 3001;

app.use(cors()); // Use the cors middleware
app.use(express.json());

app.post('/submit', async (req, res) => {
  try {
    const response = await axios.post('https://script.google.com/macros/s/AKfycbyfMMwAq8O2L-qBRAsHJN-k8pRCEeRgmLL7Yl46XWE6-xx-a-knQH3MI5sE7PxZQWAnCw/exec', req.body);
    res.status(response.status).send(response.data);
  } catch (error) {
    console.error('Error occurred:', error); // Log error for debugging
    res.status(error.response?.status || 500).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Proxy server running at http://localhost:${port}`);
});
