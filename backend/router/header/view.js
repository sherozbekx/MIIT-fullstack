const express = require("express")
const router = express.Router()
const {
    create,
    delete_data,
    get_data,
    get_datas,
    search_datas,
    update_data
} = require("../../controller/header/view")


router.post("/api/view/create", create)

// router.get("/api/gmenu/decode", decodetoken)
router.get("/api/view/all", get_datas)
router.get("/api/view/search", search_datas)
router.get("/api/view/:id", get_data)

router.put("/api/view/:id", update_data)

router.delete("/api/view/:id", delete_data)



module.exports = router