const ViewModel = require("../../model/header/view");
const ToDoClass = require("../../utils/class");

module.exports = {
    create: async (req, res, next) => {
        const result = new ToDoClass(ViewModel, req, res, next);
        result.createData()
    },
    search_datas: async (req, res, next) => {
        const result = new ToDoClass(ViewModel, req, res, next);
        result.SearchData()
    },
    get_data: async (req, res, next) => {
        const result = new ToDoClass(ViewModel, req, res, next);
        result.findById("name")
    },
    get_datas: async (req, res, next) => {
        const result = new ToDoClass(ViewModel, req, res, next);
        result.findAll("name")
    },
    update_data: async (req, res, next) => {
        const result = new ToDoClass(ViewModel, req, res, next);
        result.updateById()
    },
    delete_data: async (req, res, next) => {
        const result = new ToDoClass(ViewModel, req, res, next);
        result.deleteById()
    }
}