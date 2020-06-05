const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Apartment = require('../../models/apartment');

router.get('/:id', (req, res) => {
  console.log('single apartment');
  const id = req.params.id;
  Apartment.findById(id)
    .then((result) => res.json(result));
});

module.exports = router;