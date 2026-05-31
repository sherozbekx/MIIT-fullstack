const express = require("express")
const router = express.Router()
const {
    create,
    delete_data,
    get_data,
    get_datas,
    search_datas,
    update_data,
    get_active
} = require("../controller/header")


router.post("/api/header/create", create)

// router.get("/api/header/decode", decodetoken)
router.get("/api/header/all", get_datas)
router.get("/api/header/active", get_active)
router.get("/api/header/search", search_datas)
router.get("/api/header/:id", get_data)

router.put("/api/header/:id", update_data)

router.delete("/api/header/:id", delete_data)



module.exports = router