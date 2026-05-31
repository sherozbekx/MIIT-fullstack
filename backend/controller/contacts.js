const ContactsModel = require("../model/contacts");
const ToDoClass = require("../utils/class");

module.exports = {
    create: async (req, res, next) => {
        const result = new ToDoClass(ContactsModel, req, res, next);
        result.createData()
    },
    search_datas: async (req, res, next) => {
        const result = new ToDoClass(ContactsModel, req, res, next);
        result.SearchData()
    },
    get_data: async (req, res, next) => {
        const result = new ToDoClass(ContactsModel, req, res, next);
        result.findById()
    },
    get_datas: async (req, res, next) => {
        const result = new ToDoClass(ContactsModel, req, res, next);
        result.findAll()
    },
    update_data: async (req, res, next) => {
        const result = new ToDoClass(ContactsModel, req, res, next);
        result.updateById()
    },
    delete_data: async (req, res, next) => {
        const result = new ToDoClass(ContactsModel, req, res, next);
        result.deleteById()
    }
}