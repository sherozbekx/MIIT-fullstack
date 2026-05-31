const express = require("express")
const router = express.Router()
const {
    create,
    delete_data,
    get_data,
    get_datas,
    search_datas,
    update_data
} = require("../controller/gmenu")


router.post("/api/gmenu/create", create)

// router.get("/api/gmenu/decode", decodetoken)
router.get("/api/gmenu/all", get_datas)
router.get("/api/gmenu/search", search_datas)
router.get("/api/gmenu/:id", get_data)

router.put("/api/gmenu/:id", update_data)

router.delete("/api/gmenu/:id", delete_data)



module.exports = router