const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const File = require('../../models/pdf_files');

const checkObjectId = require('../../middleware/checkObjectId');

router.post('/', auth, async (req, res) => {
  try {
    const posts = await File.find({ uploader : req.body.name}).sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/getAllPDFS', auth, async (req, res) => {
  try {
    const pdfs = await File.find();
    res.json(pdfs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/addViews', auth, async (req, res) => {
  console.log(req.body.id)
  try {
    const posts = await File.findOne({_id: req.body.id});
    posts.views++;
    posts.save().then(res => res.json(posts))
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//change the allow
router.put('/', auth, async (req, res) => {
  pdf = await File.findById(req.body.id);
  pdf.status = !pdf.status;
  await pdf.save()
  .then(()=>res.json('success'))
  .catch(err =>console.log(err));
})

module.exports = router;
