
const OCRRecord = require('../model/ocr_record');
// var ObjectId = require('mongodb').ObjectID; // This is not used in your code
// const ocrService = new OCRService();

const getuser = async (req, res) => {
    const { id } = req.params; // Get the identification number from the request parameters
  
    try {
      // Find the user in the database based on the identification number
      const response = await OCRRecord.findOne({ identification_number: id });
  
      if (!response) {
        return res.status(404).json({
            data: {},
            success: false,
            message: "Record not found",
            err: {}
        });
    }

    return res.status(200).json({
        data: response,
        success: true,
        message: "Successfully fetched al record",
        err: {}
    });
} catch (error) {
    console.log(error);
    return res.status(500).json({
        data: {},
        success: false,
        message: "Cannot get all record",
        err: error
    });
}
};
const getusers = async (req, res) => {
    try {
        // Assuming req.params.id is the identification number
       
        // Use findOne with the identification number
        const response = await OCRRecord.find();
        console.log("respp"+ response);
        if (response.length==0) {
            return res.status(404).json({
                data: {},
                success: false,
                message: "Record not found",
                err: {}
            });
        }

        return res.status(200).json({
            data: response,
            success: true,
            message: "Successfully fetched all record",
            err: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            message: "Cannot get all record",
            err: error
        });
    }
};




const deleteUser = async (req, res) => {
    try {
        // Assuming req.params.id is the identification number
        const identificationNumber = req.params.id;
        console.log("id nooo" + identificationNumber);

        // Use findOne with the identification number
        const response = await OCRRecord.findOneAndDelete(req.params.id);
        console.log("respp"+ response);
        if (!response) {
            return res.status(404).json({
                data: {},
                success: false,
                message: "Record for delete not found",
                err: {}
            });
        }

        return res.status(200).json({
            data: response,
            success: true,
            message: "Successfully deleted record",
            err: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            message: "No data to delete",
            err: error
        });
    }
};

const updateUser = async (req, res) => {
    try {
        // Assuming req.params.id is the identification number
         const identificationNumber = req.params.id;
        console.log("id nooo" + identificationNumber);
       

        // Use findOneAndUpdate with the identification number
        const response = await OCRRecord.findOneAndUpdate(
            { identification_number: identificationNumber }, 
            { $set: req.body },
            { new: true }
        );

        console.log("respp", response);
        if (!response) {
            return res.status(404).json({
                data: {},
                success: false,
                message: "Record for update not found",
                err: {}
            });
        }

        return res.status(200).json({
            data: response,
            success: true,
            message: "Successfully updated record",
            err: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            message: "Internal Server Error",
            err: error
        });
    }
};



module.exports = {
    getuser,getusers,deleteUser,updateUser
};
