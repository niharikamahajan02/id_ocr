const express = require("express");
const connectDB = require("./config/db");
const bodyparser = require("body-parser");
const mongoose =require('mongoose');
const cors = require("cors");
const multer = require("multer");
const ApiRoutes = require("./routes/userroute");
const dotenv = require("dotenv");
const path=require('path');
const { callAnnotateImage, OCRService } = require("./codeserv");
//const { OCRService } = require("../codeserv/index");
const OCRRecord = require('./model/ocr_record');
const ocrService = new OCRService();



const setupAndStartServer = async () => {
  dotenv.config();
 connectDB();

const PORT = process.env.PORT || 5000;
  // create the express object
  const app = express();
 
  app.use(cors());
  // middlewares
  app.use(express.json());
  app.use(bodyparser.json());
  app.use(bodyparser.urlencoded({ extended: true }));

  //mongoose.connect('mongodb+srv://niharikamahajan47:hello123@cluster0.zpovjdx.mongodb.net/test?retryWrites=true&w=majority')

  app.use("/api", ApiRoutes);

  const upload=multer({dest:'uploads/'});
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      return cb(null, '/uploads');
    },
    filename: function (req, file, cb) {
      return cb(null, `${Date.now()}_${file.originalname}`);
    },
  });
 //-----------------deployment--------------------------------------------------------------
    const __dirname1= path.resolve();
    if(process.env.NODE_ENV=== "production")
    {
      app.use(express.static(path.join(__dirname1,"/frontend/build")));
    app.get('*',(req,res)=>{
     res.sendFile(path.resolve(__dirname1,"frontend","build","index.html"));
    })
    }
    else
    {
      app.get("/",(req,res)=>{
        res.send("API running successfully")
      })
     }

 // app.use(express.static(path.join(__dirname,"./frontend/build")));
 // app.get("*",function(req,res){
 //   res.sendFile(path.join(__dirname,"./frontend/build/index.html"))
 // })
// -------------deployment----------------------------------------------------------
  app.post("/api/upload", upload.single("file"), async (req, res) => {
    try {
      console.log(req.file);
      const path = req.file.destination + "/" + req.file.filename;
      console.log(path);
  
      // Assuming callAnnotateImage returns the result object
      const result = await callAnnotateImage(path);
  
      // Assuming callAnnotateImage returns an object with properties
      const ocrRecord = new OCRRecord({
        name: result.name,
        last_name: result.last_name,
        identification_number: result.identification_number,
        date_of_birth: result.date_of_birth,
        date_of_issue: result.date_of_issue,
        date_of_expiry: result.date_of_expiry,
      });
  
      await ocrRecord.save();
  
      res.status(201).json({
        data: ocrRecord,
        success: true,
        message: "Successfully processed and added a record",
        err: {},
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        data: {},
        success: false,
        message: "Error in text detection service",
        err: error,
      });
    }
  });
  

  

  app.get("/", (req, res) => {
    res.send("api runing compleeetely ");
  });

  app.listen(PORT, () => {
    console.log(`Started server at ${PORT}`);
  });
};

setupAndStartServer();
