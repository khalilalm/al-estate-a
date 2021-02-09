const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const homeSchema = new Schema({
  username: { type: String, required: true },
  description: { type: String, required: true },
  pricing: { type: Number, required: true },
  date: { type: Date, required: true },
}, {
  timestamps: true,
});

const Home = mongoose.model('Home', homeSchema);

module.exports = Home;