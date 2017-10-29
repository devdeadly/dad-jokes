const path        = require('path');
const express     = require('express');
const bodyParser  = require('body-parser');
const api         = require(path.join(__dirname, 'api.js'));
const cors        = require('cors');
const PORT        = process.env.PORT || 8000;
const app = express();

// Dead simple way to allow CORS while in dev
app.use(cors());
// Body Parser Middleware
// allows use of req.body
app.use(bodyParser.json()); 
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api', (req, res, next) => {
  api.getDadJokes(req.body, (response) => {
    if(response.status === 400){
      res.status('200').send('Invalid Number');
    } else {
      res.status('200').send(response);
    }
  });
});

app.listen(PORT, err => {
    err
    ? console.log(err)
    : console.log(`App is listening on port ${PORT}`)
  }
);
