const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const multer = require("multer");
const File = require('../../models/pdf_files');
const path = require("path");


const storage = multer.diskStorage({
  destination: "./upload/",
  filename: function(req, file, cb){
     cb(null, "PDF-" + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits:{fileSize: 100000000},
}).single("pdf_file");

router.post(
  '/',
  async (req, res) => {
    upload(req, res, () => {
      console.log("Request ---", req.body.data);
      console.log("Request file ---", req.file);//Here you get file.
      const file = new File();
      file.meta_data = req.file;
      file.save().then(()=>{
        res.send({message:"uploaded successfully"})
      })
      /*Now do where ever you want to do*/
   });
  }
);

module.exports = router;
