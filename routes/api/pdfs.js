const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const File = require('../../models/pdf_files');

const checkObjectId = require('../../middleware/checkObjectId');

router.get('/', auth, async (req, res) => {
  try {
    const posts = await File.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;