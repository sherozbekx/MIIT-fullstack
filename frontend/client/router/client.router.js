const express = require("express");
const router = express.Router();

const Page = require("../../../backend/model/header/page");
const Section = require("../../../backend/model/header/section");
const SectionView = require("../../../backend/model/header/section_view");
const Guides = require("../../../backend/model/header/guides");
const ToDoClass = require("../../../backend/utils/class")


router.get("/", async (req, res, next) => {
    res.render("./client/pages/index.ejs", {
        layout: "./client/layout/client-layout.ejs",
    })
})

router.get("/page/:page", async (req, res, next) => {
    try {        
        const pageName = req.params.page;
        const pageData = await Page.findOne({ params_name: pageName });
        const result = new ToDoClass(Page, req, res, next);
        await result.addView();
        if (!pageData) {
            return res.redirect("/404");
        }
        res.render("./client/pages/non-main.ejs", {
            layout: "./client/layout/client-layout.ejs",
            page: pageData,
        });
    } catch (error) {
        next(error);
    }
});

router.get("/sections/:section", async (req, res, next) => {
    try {        
        const pageName = req.params.section;
        console.log(pageName);
        
        const pageData = await Section.findOne({ params_name: "/sections/" + pageName });
        const result = new ToDoClass(Page, req, res, next);
        if (!pageData) {
            return res.redirect("/404");
        }
        res.render("./client/pages/non-main.ejs", {
            layout: "./client/layout/client-layout.ejs",
            page: pageData,
        });
    } catch (error) {
        next(error);
    }
});

router.get("/section/view/:sectionNum", async (req, res, next) => {
    try {        
        const pageName = req.params.sectionNum;        
        const pageData = await SectionView.findOne({ params_number: pageName });
        const result = new ToDoClass(Page, req, res, next);
        if (!pageData) {
            return res.redirect("/404");
        }
        res.render("./client/pages/non-main.ejs", {
            layout: "./client/layout/client-layout.ejs",
            page: pageData,
        });
    } catch (error) {
        next(error);
    }
});

router.get("/guides", async (req, res, next) => {
    res.render("./client/pages/non-main.ejs", {
        layout: "./client/layout/client-layout.ejs",
    })
});

router.get("/department", async (req, res, next) => {
    res.render("./client/pages/non-main.ejs", {
        layout: "./client/layout/client-layout.ejs",
    })
});
router.get("/staff", async (req, res, next) => {
    res.render("./client/pages/non-main.ejs", {
        layout: "./client/layout/client-layout.ejs",
    })
});
router.get("/region", async (req, res, next) => {
    res.render("./client/pages/non-main.ejs", {
        layout: "./client/layout/client-layout.ejs",
    })
});
router.get("/news", async (req, res, next) => {
    res.render("./client/pages/non-main.ejs", {
        layout: "./client/layout/client-layout.ejs",
    })
});
router.get("/events", async (req, res, next) => {
    res.render("./client/pages/non-main.ejs", {
        layout: "./client/layout/client-layout.ejs",
    })
});
router.get("/meeting", async (req, res, next) => {
    res.render("./client/pages/non-main.ejs", {
        layout: "./client/layout/client-layout.ejs",
    })
});
router.get("/contacts", async (req, res, next) => {
    res.render("./client/pages/non-main.ejs", {
        layout: "./client/layout/client-layout.ejs",
    })
});


module.exports = router