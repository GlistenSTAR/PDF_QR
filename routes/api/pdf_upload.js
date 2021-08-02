const express = require('express');
const router = express.Router();
const multer = require("multer");
const File = require('../../models/pdf_files');
const path = require("path");
const fs = require('fs');

const { PDFDocument } = require('pdf-lib')
const qr = require('qr-image');

let changedName = '';

const storage = multer.diskStorage({
  destination: "./upload/",
  filename: function(req, file, cb){
    changedName = Date.now() + path.extname(file.originalname);
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
    upload(req, res, async () => {
      console.log("Request ---", req.body.data);
      console.log("Request file ---", req.file);//Here you get file.
      
      const data = JSON.parse(req.body.data)
      const date = new Date();
      const file = new File();
      file.meta_data = req.file;

      //modify current pdf file.
      const template = await PDFDocument.load(fs.readFileSync(`./upload/${changedName}`));

      let qr_string = '{"title":"'+data.title+'", "description": "'+data.description+'","Uploader":"'+data.uploader+'","Create_at":"'+date+'","Origin_Name":"'+req.file.originalname+'","Changed_Name":"'+req.file.filename+'"}';
      console.log("qr_string===>", qr_string);
      let img = qr.imageSync(qr_string, {type: 'png'});
      img = await template.embedPng(img);

      const pages = template.getPages()
      const firstPage = pages[0]

      firstPage.drawImage(img, {
        x: 10,
        y: firstPage.getHeight() - 85,
        width: 75,
        height: 75
      });

      const pdfBytes = await template.save()
      
      fs.writeFileSync(`./upload/${changedName}`, pdfBytes);

      file.title = data.title
      file.description = data.description
      file.uploader = data.uploader
      file.changedName = changedName
      file.save().then(()=>{
        res.send({ message : "uploaded successfully" })
      })
   });
  }
);

module.exports = router;
