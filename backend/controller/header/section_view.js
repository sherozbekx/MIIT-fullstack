const SectionViewModel = require("../../model/header/section_view");
const ToDoClass = require("../../utils/class");

module.exports = {
    create: async (req, res, next) => {
        const result = new ToDoClass(SectionViewModel, req, res, next);
        result.createData()
    },
    search_datas: async (req, res, next) => {
        const result = new ToDoClass(SectionViewModel, req, res, next);
        result.SearchData()
    },
    get_data: async (req, res, next) => {
        const result = new ToDoClass(SectionViewModel, req, res, next);
        result.findById("section")
    },
    get_datas: async (req, res, next) => {
        const result = new ToDoClass(SectionViewModel, req, res, next);
        result.findAll("section")
    },
    update_data: async (req, res, next) => {
        const result = new ToDoClass(SectionViewModel, req, res, next);
        result.updateById()
    },
    delete_data: async (req, res, next) => {
        const result = new ToDoClass(SectionViewModel, req, res, next);
        result.deleteById()
    }
}