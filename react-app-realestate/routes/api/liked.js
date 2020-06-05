const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Apartment = require('../../models/apartment');

router.post('/', (req, res) => {
  const ids = req.body;
  Apartment.find({ 
    '_id': {$in: ids.map((v) => mongoose.Types.ObjectId(v)) }
  })
    .then((result) => res.json(result));
});

module.exports = router;