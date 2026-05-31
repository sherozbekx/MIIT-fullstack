const express = require("express")
const router = express.Router()
const {
    create,
    delete_data,
    get_data,
    get_datas,
    search_datas,
    update_data
} = require("../controller/active")


router.post("/api/active/create", create)

// router.get("/api/header/decode", decodetoken)
router.get("/api/active/all", get_datas)
router.get("/api/active/search", search_datas)
router.get("/api/active/:id", get_data)

router.put("/api/active/:id", update_data)

router.delete("/api/active/:id", delete_data)



module.exports = router