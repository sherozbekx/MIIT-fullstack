const express = require("express")
const router = express.Router()
const {
    create,
    delete_data,
    get_data,
    get_datas,
    search_datas,
    update_data
} = require("../controller/header-link")


router.post("/api/header-link/create", create)

// router.get("/api/header-link/decode", decodetoken)
router.get("/api/header-link/all", get_datas)
router.get("/api/header-link/search", search_datas)
router.get("/api/header-link/:id", get_data)

router.put("/api/header-link/:id", update_data)

router.delete("/api/header-link/:id", delete_data)



module.exports = router