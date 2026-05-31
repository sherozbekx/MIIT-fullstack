const isAuth = async (req, res, next) => {
    if (req.session.AUTH) {
        next()
    } else {
        return res.redirect("/401")
    }
}

const roles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.session.ROLE)) {
            return res.redirect("/404")
        }
        next();
    };
}

module.exports = { isAuth, roles }