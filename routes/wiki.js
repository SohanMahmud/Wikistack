const express = require ("express");
const router = express.Router();
const views = require("../views");
const { Page } = require("../models");



function slugMaker (title){


  return title.replace(/\s+/g, '_').replace(/\W/g, '');
}

router.get('/', (req, res) =>{

  res.send("this is the wiki homepage")

})

router.post('/', async (req, res, next) =>{
const titleInput = req.body.title;
const contentInput = req.body.content;

let fixedSlug = " ";

if(titleInput){
fixedSlug= slugMaker(titleInput);
}
else { fixedSlug = "no title";}

  try {
    const page = await Page.create({
      title: titleInput,
      content: contentInput,
      slug: fixedSlug
    });

    // make sure we only redirect *after* our save is complete! Don't forget to `await` the previous step. `create` returns a Promise.
    res.redirect('/');
  } catch (error) { next(error) }
})

router.get('/add', (req, res) =>{



  res.send(views.addPage())

})
module.exports = router;





