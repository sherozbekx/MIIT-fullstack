const express = require("express")
const router = express.Router()
const {
    create,
    delete_data,
    get_data,
    get_datas,
    search_datas,
    update_data
} = require("../../controller/header/section")
const sectionsModel = require("../../model/header/section");


router.post("/api/section/create", create)

// router.get("/api/gmenu/decode", decodetoken)
router.get("/api/section/all", get_datas)
router.get("/api/section/search", search_datas)
router.get("/api/sections", async (req, res, next) => {
    try {
        const { params_name } = req.query;
        if (!params_name) return res.json({ error: "params_name is required" });

        const page = await sectionsModel.findOne({ params_name: params_name }).populate('header');
        if (!page) return res.json({ error: "Section not found" });

        res.json({ data: page });
    } catch (error) {
        next(error);
    }
});
router.get("/api/section/:id", get_data)

router.put("/api/section/:id", update_data)

router.delete("/api/section/:id", delete_data)
module.exports = router