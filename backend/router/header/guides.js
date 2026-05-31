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
    
    
} = require("../../controller/header/guides")
const multer = require("multer");
const md5 = require("md5")
const path = require('path');
const guidesModel = require("../../model/header/guides");
const ToDoClass = require("../../utils/class");


const storage = multer.diskStorage({
    destination: function (req, file, callback) { callback(null, './public/upload/employee') },
    filename: function (req, file, callback) { callback(null, `${md5(Date.now())}${path.extname(file.originalname)}`) }
})

const storages = multer({ storage: storage })
const UPLOADING = storages.fields([
    { name: 'image', maxCount: 1 }  
]);


router.post("/api/guides/create", UPLOADING, create)

router.get("/api/guides/all", get_datas)
router.get("/api/guides/search", search_datas)
router.get("/api/guides/:id", async (req, res, next) => {
    const result = new ToDoClass(guidesModel, req, res, next);

    // Try to add a view first
    await result.addView();

    // Now, send the response only once
    result.findById("header"); // Add other fields you want to populate
});

router.put("/api/guides/:id", update_data)
router.put("/api/guides/file/:id", UPLOADING, update_image)


router.delete("/api/guides/:id", delete_data)
router.delete("/api/guides/img/:id", delete_image)



module.exports = router