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
    delete_images,
    updateFile,
    update_image,
    update_images,
    get_gmenu    
} = require("../../controller/header/page")
const multer = require("multer");
const md5 = require("md5")
const path = require('path');
const fs = require('fs');
const pagesModel = require("../../model/header/page");
const ToDoClass = require("../../utils/class");


const storage = multer.diskStorage({
    destination: function (req, file, callback) { callback(null, './public/upload/pages') },
    filename: function (req, file, callback) { callback(null, `${md5(Date.now())}${path.extname(file.originalname)}`) }
})

const storages = multer({ storage: storage })
const UPLOADING = storages.fields([
    { name: 'images', maxCount: 10 }  
]);


router.post("/api/pages/create", UPLOADING, create)

router.get("/api/pages/all", get_datas)
router.get("/api/pages/gmenu", get_gmenu)
router.get("/api/pages/search", search_datas)
router.get("/api/pages/:id", async (req, res, next) => {
    const result = new ToDoClass(pagesModel, req, res, next);
    await result.addView();
    result.findById("header"); 
});
router.get("/api/pages", async (req, res, next) => {
    try {
        const { params_name } = req.query;
        if (!params_name) return res.status(400).json({ error: "params_name is required" });

        const page = await pagesModel.findOne({ params_name: params_name }).populate('header');
        if (!page) return res.status(404).json({ error: "Page not found" });

        res.json({ data: page });
    } catch (error) {
        next(error);
    }
});

router.put("/api/pages/:id", update_data)
router.put("/api/pages/files/:id", UPLOADING, update_images)


router.delete("/api/pages/:id", delete_data)
router.delete("/api/pages/img/:id", delete_image)
router.delete("/api/pages/imgs/:id", delete_images)



module.exports = router