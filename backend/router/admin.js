const express = require("express")
const router = express.Router()
const {
    decodetoken,
    delete_data,
    get_data,
    get_datas,
    login,
    register,
    search_datas,
    update_data
} = require("../controller/admin");

const Admin = require("../model/admin")
const mongoose = require("mongoose");


router.post("/api/admin/sign-up", register)
router.post("/api/admin/sign-in", login)

router.get("/api/admin/decode", decodetoken)
router.get("/api/admin/all", get_datas)
router.get("/api/admin/search", search_datas)
router.get("/api/admin/:id", get_data)

router.put("/api/admin/:id", update_data)

router.delete("/api/admin/:id", delete_data)



module.exports = router