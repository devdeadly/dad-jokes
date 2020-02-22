// access variables in .env file through process.env
require('dotenv').config();
const fetch = require('node-fetch');

const {
  TWILIO_ACCOUNT_SID,
  TWILIO_PHONE_NUMBER,
  TWILIO_AUTH_TOKEN
} = process.env;

const client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

module.exports = {
  getDadJokes: (obj, callback) => {
    fetch('https://icanhazdadjoke.com/', {
      headers: {
        Accept: 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        const { joke } = data;

        const text = `${obj.name} has sent you a dad joke courtesy of:\ndad-jokes-k94xd.herokuapp.com/\n\n${joke}`;

        client.messages.create(
          {
            to: obj.phone,
            from: TWILIO_PHONE_NUMBER,
            body: text
          },
          (err, message) => {
            if (err) {
              console.error('ERROR', err);
              return callback(err);
            } else {
              console.log('MESSAGE', message.sid);
              return callback(data);
            }
          }
        );
      });
  }
};

// SEND JOKE EVERY TEN SECONDS
// setInterval(getDadJoke(), 600000)
