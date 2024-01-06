const OCRRecord = require('../model/ocr_record');

// containing actual code for crud operation
class OCRRecordRepository {
  async createRecord(name, lastname, identity_num, dob, issue_date, expiry_date) {
    try {
      const ocrRecord = await OCRRecord.create({
        identification_number: identity_num,
        name: name,
        last_name: lastname,
        date_of_birth: dob,
        date_of_issue: issue_date,
       date_of_expiry: expiry_date,
      });
 console.log("file created");
    //  console.log(name, lastname, identity_num, dob, issue_date, expiry_date);
      //console.log(new Date(dob));
      console.log(ocrRecord);
      return ocrRecord;
    } catch (error) {
      console.log('Something went wrong in repository layer in creating record');
      throw { error };
    }
  }

}

module.exports = OCRRecordRepository;
