const express = require('express');
const Router = express.Router();

// Ensure the app uses body-parsing middleware
const bodyParser = require('body-parser');
Router.use(bodyParser.json());

// POST endpoint for payment verification
Router.post('/paymentVerifcation', async (req, res) => {
  
});

module.exports = Router;
