const express = require('express');
const mongoose = require('mongoose');
const Apartment = require('./models/apartment');
const config = require('config');

const app = express();
app.use(express.json());

const db = config.get('mongoURI');

const changePath = async () => {
  try {
    const apartments = await Apartment.find();

    for (const apt of apartments) {
      apt.img = apt.img.map(path => path.replace('uploads', 'images'));
      await apt.save();
    }
    console.log('done!');
  } catch (error) {
    console.log(err);
  }
  
  process.exit();
}

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Script Connected...');
    changePath();
  })
  .catch(err => console.log(err));
