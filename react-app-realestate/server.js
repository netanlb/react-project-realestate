const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const fileUpload = require('express-fileupload');
const busboy = require('connect-busboy');
const path = require('path');

//TEMP
const cors = require('cors');
//

const app = express();

app.use(express.json());
app.use(cors());
app.use(fileUpload());
app.use(busboy());

const db = config.get('mongoURI');

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

app.use('/api/apartments', require('./routes/api/apartments'));
app.use('/api/liked', require('./routes/api/liked'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/upload', require('./routes/api/upload'));
app.use('/api/apartment', require('./routes/api/apartment'));
app.use('/images/', express.static(`${__dirname}/uploads`));

if(process.env.NODE_ENV === 'production') {
  app.use(experss.static(`${__dirname}/client/build`));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
