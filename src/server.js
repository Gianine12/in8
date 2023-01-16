const express = require('express');
const router = require('./routes');

const app = express();
const port = 3333;

app.use(express.json());

app.use('/api', router);

app.listen(port, () => {
  console.log(`Servidor rodando na url http://localhost:${port}`);
});