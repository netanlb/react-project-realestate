const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

router.post('/', (req, res) => {
  if(req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }
  const fileList = req.files.files;
  if (fileList.length > 1) {
    Array.from(fileList).forEach(file => {
      console.log(file);
      file.mv(`${__dirname}/../../uploads/${file.name}`, err => {
        if(err) {
          console.log(err);
          return res.status(500).send(err);
        }
      });
      const filePaths = Array.from(fileList).map(file => `/images/${file.name}`);
      res.json({ filePaths });

    })
  } else {
    fileList.mv(`${__dirname}/../../uploads/${fileList.name}`, err => {
      if(err) {
        console.log(err);
        return res.status(500).send(err);
      }
    });
    const filePaths = [`/images/${fileList.name}`];
    res.json({ filePaths });
  }
  
})

module.exports = router;