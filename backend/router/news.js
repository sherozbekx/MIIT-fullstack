const express = require("express")
const router = express.Router()
const {
    create,
    delete_data,
    get_data,
    get_datas,
    search_datas,
    update_data,
    delete_images,
    delete_image,
    delete_imagee,
    update_image,
    update_images,
    addNewsView
    
} = require("../controller/news")
const multer = require("multer");
const md5 = require("md5")
const path = require('path');
const NewsModel = require("../model/news");
const ToDoClass = require("../utils/class");


const storage = multer.diskStorage({
    destination: function (req, file, callback) { callback(null, './public/upload') },
    filename: function (req, file, callback) { callback(null, `${md5(Date.now())}${path.extname(file.originalname)}`) }
})

const storages = multer({ storage: storage })
const UPLOADING = storages.fields([
    { name: 'image', maxCount: 1 }, 
    { name: 'images', maxCount: 10 }  
]);


router.post("/api/news/create", UPLOADING, create)

router.get("/api/news/all", get_datas)
router.get("/api/news/search", search_datas)
router.get("/api/news/latest", async (req, res) => {
    try {
        const latestNews = await NewsModel.find({ status: "active" })
            .sort({ createdAt: -1 })
            .limit(2);
        res.json(latestNews);
    } catch (error) {
        res.json({ message: "Server Error", error });
    }
});
router.get("/api/news/late", async (req, res) => {
    try {
        const latestNews = await NewsModel.find({ status: "active" })
            .sort({ createdAt: -1 })
            .skip(2)
            .limit(5);
        
        res.json(latestNews);
    } catch (error) {
        res.json({ message: "Server Error", error });
    }
});
router.get("/api/news/:id", async (req, res, next) => {
    const result = new ToDoClass(NewsModel, req, res, next);
    await result.addView();
    result.findById("activity_page");
});



router.put("/api/news/:id", update_data)
router.put("/api/news/file/:id", UPLOADING, update_image)
router.put("/api/news/files/:id", UPLOADING, update_images)


router.delete("/api/news/:id", delete_data)
router.delete("/api/news/img/:id", delete_image)
router.delete("/api/news/imgg/:id", delete_imagee)
router.delete("/api/news/imgs/:id", delete_images)



module.exports = router