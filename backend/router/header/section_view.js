const express = require("express")
const router = express.Router()
const {
    create,
    delete_data,
    get_data,
    get_datas,
    search_datas,
    update_data
} = require("../../controller/header/section_view")
const sectionsModel = require("../../model/header/section_view");
const sectionModel = require("../../model/header/section");


router.post("/api/section/view/create", create)

// router.get("/api/gmenu/decode", decodetoken)
router.get("/api/section/view/all", get_datas)
router.get("/api/section/view/search", search_datas)
router.get("/api/section/view", async (req, res, next) => {
    try {
        const { params_name } = req.query;
        if (!params) return res.json({ error: "params is required" });

        const page = await sectionModel.findOne({ params_name: params_name }).populate('header');
        // const pageView = await sectionsModel.findOne({ params_name: section }).populate('section');
        if (!page) return res.json({ error: "Section not found" });

        res.json({ data: page });
    } catch (error) {
        next(error);
    }
});
router.get("/api/section/view/:id", get_data)

router.put("/api/section/view/:id", update_data)

router.delete("/api/section/view/:id", delete_data)
module.exports = router