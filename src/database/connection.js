require('dotenv').config()
const mongoose = require('mongoose');
const connection = mongoose.createConnection(process.env.URI_DEV);
module.exports = connection