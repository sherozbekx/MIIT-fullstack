const express = require("express")
const router = express.Router()
const {
    create,
    delete_data,
    get_data,
    get_datas,
    search_datas,
    update_data
} = require("../../controller/header/department")


router.post("/api/department/create", create)

// router.get("/api/gmenu/decode", decodetoken)
router.get("/api/department/all", get_datas)
router.get("/api/department/search", search_datas)
router.get("/api/department/:id", get_data)

router.put("/api/department/:id", update_data)

router.delete("/api/department/:id", delete_data)



module.exports = router