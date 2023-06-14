const mongoose = require('mongoose');
const mongoDB = 'mongodb://127.0.0.1/crud';
// const mongoDB = 'mongodb+srv://zohaibahmed18b:zohaib12345@cluster0.wmqsn6g.mongodb.net/';

mongoose.connect(mongoDB, { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('connected', () => {
  console.log('Connected to MongoDB');
});
db.on('disconnected', () => {
  console.log('Disconnected from MongoDB');
});

module.exports = db;