const express = require('express');
const morgan = require('morgan');
// const views = require('./views');
const layout = require('./views/layout');
const { db, Page, User } = require('./models');
const app = express();

db.authenticate()
  .then(() => {
    console.log('connected to the database');
})

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send(layout(''));
});

const PORT = 1337;

async function init() {

  await db.sync( { force: true } );

  app.listen(PORT, () => {
    console.log(`Now listening on port: ${PORT}`);
  })

}

init();



