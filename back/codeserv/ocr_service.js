const { OCRRecordRepository} = require("../repo/index");

class OCRService{
    constructor(){
        this.ocrRepository = new  OCRRecordRepository();
    }

    async createRecord(name, lastname, identity_num, dob, issue_date, expiry_date){
        try {
            const ocr = await this.ocrRepository.createRecord(name, lastname, identity_num, dob, issue_date, expiry_date);
            return ocr;
        } catch (error) {
            console.log("Error in services");
            throw(error);
        }
    }

   

    
   

}

module.exports = OCRService;