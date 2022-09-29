const express = require('express');
const morgan = require('morgan');
const userRouter = require('./routes/users')

const wikiRouter = require('./routes/wiki')
const layout = require('./views/layout');
const { db, Page, User } = require('./models');
const app = express();
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use('/wiki', wikiRouter);
app.use('/users', userRouter);

db.authenticate()
  .then(() => {
    console.log('connected to the database');
})



app.get('/', (req, res) => {
  res.redirect('/wiki');
});

const PORT = 1337;

async function init() {

  await db.sync( { force: true } );

  app.listen(PORT, () => {
    console.log(`Now listening on port: ${PORT}`);
  })

}

init();



