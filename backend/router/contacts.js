const express = require("express")
const router = express.Router()
const {
    create,
    delete_data,
    get_data,
    get_datas,
    search_datas,
    update_data
} = require("../controller/contacts")

router.post("/api/contacts/create", create)

router.get("/api/contacts/all", get_datas)
router.get("/api/contacts/search", search_datas)
router.get("/api/contacts/:id", get_data)

router.put("/api/contacts/:id", update_data)

router.delete("/api/contacts/:id", delete_data)

module.exports = router