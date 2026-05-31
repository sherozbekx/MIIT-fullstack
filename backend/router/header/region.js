const express = require("express")
const router = express.Router()
const {
    create,
    delete_data,
    get_data,
    get_datas,
    search_datas,
    update_data
} = require("../../controller/header/region")


router.post("/api/region/create", create)

router.get("/api/region/all", get_datas)
router.get("/api/region/search", search_datas)
router.get("/api/region/:id", get_data)

router.put("/api/region/:id", update_data)

router.delete("/api/region/:id", delete_data)



module.exports = router