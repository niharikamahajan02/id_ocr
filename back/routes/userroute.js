const express = require('express');
//const OCRController = require('../controller/ocr_controller');
const UploadController = require('../controller/uploadcontroller');
//import {
//    
//    getuser
//} from "../controller/ocr_controller"
const OCRController = require( "../controller/ocr_controller");
const router = express.Router();

//router.post('/upload', UploadController.upload);

//
//router.delete('/:id', OCRController.destroy);
router.get('/:id',OCRController.getuser);
//router.patch('/:id', OCRController.update);
router.get('/', OCRController.getusers)
router.delete('/:id',OCRController.deleteUser)
router.put('/:id', OCRController.updateUser)

module.exports = router;