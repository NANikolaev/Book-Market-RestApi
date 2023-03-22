const router = require('express').Router();
const multer=require('multer');
const upload=multer();
const uploadService=require("../services/upload-cover-service");

router.route("/upload/cover")

.post(upload.single('image'),async(req,res)=>{
       let image=req.file
       let cover= await uploadService.uploadCover(image);
       res.json(cover)
})


module.exports = router