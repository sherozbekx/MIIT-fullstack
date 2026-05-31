const AdminModel = require("../model/admin");
const ToDoClass = require("../utils/class");
const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken')
const {sessionTime, time, tokenKeyword} = require('../config/settings');
const { data, error } = require("jquery");

module.exports = {
    register: async (req, res, next) => {
        const result = new ToDoClass(AdminModel, req, res, next);
        result.createData()
    },
    login: async (req, res, next) => {
        try {
            const { phone, password } = req.body;
            if (!phone || phone == undefined || password == undefined || !password) {
                res.json({ status: false, message: "Pochta yoki parolni kiriting" })
            }
            else {
                // Phone boyicha osha odamni malumotini olamiz
                const user = await AdminModel.findOne({ phone: phone })
                if (!user || user == null) {
                    res.json({ status: false, message: "Foydalanuvchi topilmadi" })
                }
                else {
    
                    const pass = user.password;
                    const isMatch = await bcrypt.compare(password, pass);
                    if (isMatch == false) {
                        res.json({ status: false, message: "Parolingiz xato" })
                    }
                    else {
                        const token = jsonwebtoken.sign(
                            {
                                id: user._id,
                                name: user.name,
                            },
                            tokenKeyword,
                            { expiresIn: sessionTime });
    
    
                        // Sessiya yaratish
                        if (user.role == "admin" || user.role == "super-admin") {
                            const session = req.session;
                            session.AUTH = true;
                            session.ROLE = user.role;
                            req.session.save()
                        }
    
                        res.json({ status: true, data: token })
                    }
                }
            }
        }
        catch (error) {
            res.json({ status: false, error: error.message })
        }
    },
    decodetoken: async (req, res, next) => {
        const token = req.headers.authorization;
        jsonwebtoken.verify(token, tokenKeyword, function (err, result) {
            if (err) {
                res.json({ status: false, data: err.message })
            }
            else {
                res.json({ status: true, data: result })
            }
        });
    },
    search_datas: async (req, res, next) => {
        const result = new ToDoClass(AdminModel, req, res, next);
        result.SearchData()
    },
    get_data: async (req, res, next) => {
        const result = new ToDoClass(AdminModel, req, res, next);
        result.findById("name", "phone")
    },
    get_datas: async (req, res, next) => {
        const result = new ToDoClass(AdminModel, req, res, next);
        result.findAll("name")
    },
    update_data: async (req, res, next) => {
        const result = new ToDoClass(AdminModel, req, res, next);
        result.updateById()
    },
    delete_data: async (req, res, next) => {
        const result = new ToDoClass(AdminModel, req, res, next);
        result.deleteById()
    },
    updatePass: async (req, res, next) => {
        const { id, password } = req.body;
        const hashed = await bcrypt.hash(password, await bcrypt.genSalt(12));
        const user = await AdminModel.findByIdAndUpdate(id)
        user.password = hashed;
        await user.save()
            .then( () => {
                return res.json({ status: true, data: user });
            }).catch((err) => {
                return res.json({status: false, error: err.message});
            })
    }
}