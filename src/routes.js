const express = require('express');
const router = express.Router();

const roboController = require('./controllers/roboController');
//get, post, delete, put
router.get('/oi',roboController.roboPesquisa)

module.exports = router;