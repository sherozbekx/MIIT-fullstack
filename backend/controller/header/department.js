const DepartmentModel = require("../../model/header/department");
const ToDoClass = require("../../utils/class");

module.exports = {
    create: async (req, res, next) => {
        const result = new ToDoClass(DepartmentModel, req, res, next);
        result.createData()
    },
    search_datas: async (req, res, next) => {
        const result = new ToDoClass(DepartmentModel, req, res, next);
        result.SearchData()
    },
    get_data: async (req, res, next) => {
        const result = new ToDoClass(DepartmentModel, req, res, next);
        result.findById("header")
    },
    get_datas: async (req, res, next) => {
        const result = new ToDoClass(DepartmentModel, req, res, next);
        result.findAll("header")
    },
    update_data: async (req, res, next) => {
        const result = new ToDoClass(DepartmentModel, req, res, next);
        result.updateById()
    },
    delete_data: async (req, res, next) => {
        const result = new ToDoClass(DepartmentModel, req, res, next);
        result.deleteById()
    }
}