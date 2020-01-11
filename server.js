const express = require('express')
const cors = require('cors')
const { PORT, CLIENT_ORIGIN } = require('./config');
const router = require('./router')
const app = express()

app.use(
    cors({
      origin: 'https://jack8191.github.io'
    })
  )

app.use('/', router)


let server;

function runServer(port = PORT) {
    return new Promise((resolve, reject) => {
        server = app.listen(port, () => {
          console.log(`Your app is listening on port ${port}`);
          resolve();
        })
          .on('error', err => {
            reject(err);
          });
      });
  }
  function closeServer() {
    return mongoose.disconnect().then(() => {
      return new Promise((resolve, reject) => {
        console.log('Closing server');
        server.close(err => {
          if (err) {
            return reject(err);
          }
          resolve();
        });
      });
    });
  }
  
  if (require.main === module) {
    runServer().catch(err => console.error(err));
  }

 module.exports = { app, runServer, closeServer };
