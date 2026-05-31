const express = require("express");
const router = express.Router();
const { isAuth, roles } = require("../../../backend/middleware/frontend.middlware")

router.get("/admin/login", async (req, res, next) => {
    res.render("./admin/pages/login.ejs", {
        layout: "./admin/layout/auth-layout.ejs"
    })
})

// LAYOUT - admin-layout.ejs
router.get("/admin/index", isAuth, roles("admin", "super-admin"), async (req, res, next) => {
    res.render("./admin/pages/index.ejs", {
        layout: "./admin/layout/admin-layout.ejs"
    })
})
router.get("/admin/preview", isAuth, roles("admin", "super-admin"), async (req, res, next) => {
    res.render("./admin/pages/preview.ejs", {
        layout: "./admin/layout/admin-layout.ejs"
    })
})
router.get("/admin/contacts", isAuth, roles("admin", "super-admin"), async (req, res, next) => {
    res.render("./admin/pages/contacts.ejs", {
        layout: "./admin/layout/admin-layout.ejs"
    })
})
router.get("/admin/headers", isAuth, roles("admin", "super-admin"), async (req, res, next) => {
    res.render("./admin/pages/header.ejs", {
        layout: "./admin/layout/admin-layout.ejs"
    })
})
router.get("/admin/sections", isAuth, roles("admin", "super-admin"), async (req, res, next) => {
    res.render("./admin/pages/sections.ejs", {
        layout: "./admin/layout/admin-layout.ejs"
    })
})
router.get("/admin/sections/view", isAuth, roles("admin", "super-admin"), async (req, res, next) => {
    res.render("./admin/pages/section_view.ejs", {
        layout: "./admin/layout/admin-layout.ejs"
    })
})
router.get("/admin/gmenu", isAuth, roles("admin", "super-admin"), async (req, res, next) => {
    res.render("./admin/pages/gmenu.ejs", {
        layout: "./admin/layout/admin-layout.ejs"
    })
})
router.get("/admin/region", isAuth, roles("admin", "super-admin"), async (req, res, next) => {
    res.render("./admin/pages/region.ejs", {
        layout: "./admin/layout/admin-layout.ejs"
    })
})
router.get("/admin/department", isAuth, roles("admin", "super-admin"), async (req, res, next) => {
    res.render("./admin/pages/department.ejs", {
        layout: "./admin/layout/admin-layout.ejs"
    })
})
router.get("/admin/staff", isAuth, roles("admin", "super-admin"), async (req, res, next) => {
    res.render("./admin/pages/staff.ejs", {
        layout: "./admin/layout/admin-layout.ejs"
    })
})

router.get("/admin/guides", isAuth, roles("admin", "super-admin"), async (req, res, next) => {
    res.render("./admin/pages/guides.ejs", {
        layout: "./admin/layout/admin-layout.ejs"
    })
})

router.get("/admin/news", isAuth, roles("admin", "super-admin"), async (req, res, next) => {
    res.render("./admin/pages/news.ejs", {
        layout: "./admin/layout/admin-layout.ejs"
    })
})

router.get("/admin/pages", isAuth, roles("admin", "super-admin"), async (req, res, next) => {
    res.render("./admin/pages/page.ejs", {
        layout: "./admin/layout/admin-layout.ejs"
    })
})

router.get("/admin/active-page", isAuth, roles("admin", "super-admin"), async (req, res, next) => {
    res.render("./admin/pages/active.ejs", {
        layout: "./admin/layout/admin-layout.ejs"
    })
})

router.get("/superadmin/index", isAuth, roles("super-admin"), async (req, res, next) => {
    res.render("./admin/pages/superindex.ejs", {
        layout: "./admin/layout/superadmin-layout.ejs"
    })
})

router.get("/superadmin/list", isAuth, roles("super-admin"), async (req, res, next) => {
    res.render("./admin/pages/admin.ejs", {
        layout: "./admin/layout/superadmin-layout.ejs"
    })
})




router.get("/404", async (req, res, next) => {
    res.render("./admin/pages/not-found-page.ejs", {
        layout: "./admin/layout/auth-layout.ejs"
    })
})
router.get("/401", async (req, res, next) => {
    res.render("./admin/pages/unauthorized.ejs", {
        layout: "./admin/layout/auth-layout.ejs"
    })
})



module.exports = router