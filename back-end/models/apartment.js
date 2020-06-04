const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const apartmentSchema = new Schema({
  address: {
    type: Object,
    required: false,
  },
  city: {
    type: String,
    required: false,
  },
  entranceDate: {
    type: Date,
    required: false,
  },
  rooms: {
    type: Number,
    required: false,
  },
  squareMeters: {
    type: Number,
    required: false,
  },
  price: {
    type: Number,
    required: false,
  },
  img: {
    type: Array,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now
  },
  user: {
    type: String,
    required: false,
  },
  userId: {
    type: String,
    required: false,
  },
  parking: {
    type: Boolean,
    required: false,
  },
  balcony: {
    type: Boolean,
    required: false,
  },
  pets: {
    type: Boolean,
    required: false,
  },
  elevator: {
    type: Boolean,
    required: false,
  },
  airConditioner: {
    type: Boolean,
    required: false,
  },
  flatMates: {
    type: Boolean,
    required: false,
  },
  longterm: {
    type: Boolean,
    required: false,
  },
  handicapAccess: {
    type: Boolean,
    required: false,
  },
  furnished: {
    type: Boolean,
    required: false,
  },
  storage: {
    type: Boolean,
    required: false,
  },
  bombShelter: {
    type: Boolean,
    required: false,
  },
  frontYard: {
    type: Boolean,
    required: false,
  },
});

module.exports = apartment = mongoose.model('apartment', apartmentSchema);