const express = require('express');
const router = express.Router();
const multer = require("multer");
const File = require('../../models/pdf_files');
const path = require("path");


const storage = multer.diskStorage({
  destination: "./upload/",
  filename: function(req, file, cb){
     cb(null, Date.now() + path.extname(file.originalname));
     cb(null, Date.now() + "-" + file.originalname);
  }
}
);

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
      const data = JSON.parse(req.body.data)
      const file = new File();
      file.meta_data = req.file;
      file.title = data.title
      file.description = data.description
      file.uploader = data.uploader
      file.save().then(()=>{
        res.send({ message : "uploaded successfully" })
      })
   });
  }
);

module.exports = router;
