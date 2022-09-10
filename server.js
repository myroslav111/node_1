const express = require('express');
const morgan = require('morgan');
const app = express();

const PORT = 8081;

app.get('/home', (req, res) => {
  res.send('get request');
});

app.post('/home', (req, res) => {
  res.send('post request');
});

app.delete('/home', (req, res) => {
  res.send('delete request');
});

app.use((req, res) => {
  res.send('midlewear request');
});

app.listen(PORT, err => {
  if (err) {
    console.log('Error at aserver Launch:', err);
  }
  console.log(`server works at port ${PORT}`);
});
