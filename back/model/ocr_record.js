const mongoose = require('mongoose');
const moment = require('moment');

const ocrRecordSchema = new mongoose.Schema({
 
  identification_number: {
    type: String,
    unique: true,
  },
  name: String,
  last_name: String,
  date_of_birth: String,
  date_of_issue: String,
  date_of_expiry: String,
  timestamp: String,
  status: String,
  error_message: String,
});


  
console.log("testing model console")

const OCRRecord = mongoose.model('OCRRecord', ocrRecordSchema);

module.exports = OCRRecord;
