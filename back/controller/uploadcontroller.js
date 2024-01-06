const {callAnnotateImage} = require("../codeserv/index");
const {OCRService} = require("../codeserv/index");

const ocrService = new OCRService();

// Post for detecting text using Cloud Vision
const upload = async (req, res) => {
    try {

        const url=req.file;
      // console.log("re bdyyy" + req.body);
        console.log("urlll" + url);
        const result = await callAnnotateImage(url);
        console.log("aksdfbnkdjf" + result);
        const ocr = await ocrService.
        createRecord(result.name, result.last_name, result.identification_number, result.date_of_birth, result.date_of_issue, result.date_of_expiry);

        return res.status(201).json({
            data: ocr,
            success: true,
            message: "Successfully processed and added a record",
            err: {}
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            message: "Error in text detection service",
            err: error
        });
    }
};

module.exports = {
    upload
};