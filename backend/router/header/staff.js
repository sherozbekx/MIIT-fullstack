const express = require("express")
const router = express.Router()
const {
    create,
    delete_data,
    get_data,
    get_datas,
    search_datas,
    update_data,
    addView,
    delete_image,
    update_image
    
    
} = require("../../controller/header/staff")
const multer = require("multer");
const md5 = require("md5")
const path = require('path');
const staffModel = require("../../model/header/staff");
const ToDoClass = require("../../utils/class");


const storage = multer.diskStorage({
    destination: function (req, file, callback) { callback(null, './public/upload/employee') },
    filename: function (req, file, callback) { callback(null, `${md5(Date.now())}${path.extname(file.originalname)}`) }
})

const storages = multer({ storage: storage })
const UPLOADING = storages.fields([
    { name: 'image', maxCount: 1 }  
]);


router.post("/api/staff/create", UPLOADING, create)

router.get("/api/staff/all", get_datas)
router.get("/api/staff/search", search_datas)
router.get("/api/staff/:id", get_data);

router.put("/api/staff/:id", update_data);
router.put("/api/staff/file/:id", UPLOADING, update_image)


router.delete("/api/staff/:id", delete_data)
router.delete("/api/staff/img/:id", delete_image)



module.exports = router