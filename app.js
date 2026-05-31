const express = require("express");
const bodyParser = require("body-parser");
const expressLayouts = require('express-ejs-layouts');
const cors = require('cors');

const path = require("path");
const mongoose = require("mongoose");
const { port, hostname, database, sessionTime } = require("./backend/config/settings")
const i18n = require("i18n-express");

const expressSession = require('express-session')
const mongoDbSession = require('connect-mongodb-session')(expressSession)

const app = express()

app.use(expressLayouts)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.set("views", path.join(__dirname, "./frontend"))
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")))
app.use(cors({ origin: "*" }))

const store = new mongoDbSession({
    uri: database,
    collection: "sessions"
})

app.use(
    expressSession({
        secret: "7650d3efe9d32071f601e9d148767d26",
        saveUninitialized: false,
        store: store,
        resave: false,
        cookie: {
            httpOnly: true,
            maxAge: sessionTime,
            sameSite: "strict"
        }
    })
)

app.use(i18n({
    translationsPath: path.join(__dirname, './backend/i18n'),
    siteLangs: ["uz", "ru"],
    textsVarName: 't',
    cookieLangName: 'ulang',
    defaultLang: 'uz',
}))

app.get("/api/language/:lang", async (req, res, next) => {
    const { lang } = req.params;
    req.session.ulang = lang;
    req.session.save()
    res.json({ success: true })
})

app.use(require("./frontend/admin/router/admin.router")) // ADMIN
app.use(require("./frontend/client/router/client.router")) // CLIENT

app.use(require("./backend/router/admin"))
app.use(require("./backend/router/gmenu"))
app.use(require("./backend/router/header"))
app.use(require("./backend/router/contacts"))
app.use(require("./backend/router/news"))

app.use(require("./backend/router/header/department"))
app.use(require("./backend/router/header/guides"))
app.use(require("./backend/router/header/page"))
app.use(require("./backend/router/header/section"))
app.use(require("./backend/router/header/section_view"))
app.use(require("./backend/router/header/staff"))
app.use(require("./backend/router/header/view"))
app.use(require("./backend/router/header/region"))

// app.use("*", async (req, res, next) => { res.redirect('/not-found')  })

mongoose.connect(database)
    .then(() => {
        console.log(`Database is at http://${hostname}:${port}/`)
    })
    .catch((error) => {
        console.log(error.message)
    })
app.listen(port, () => { console.log('Server is running') })