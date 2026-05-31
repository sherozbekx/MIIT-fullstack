const GuidesModel = require("../../model/header/guides");
const ToDoClass = require("../../utils/class");
const mongoose = require("mongoose");

const fs = require("fs");
const path = require("path");
const sizeOf = require("image-size");
module.exports = {
    create: async (req, res, next) => {
        try {
            if (!req.files.image) {
                return res.json({ status: false, message: "Image is required." });
            }
            else {
                
                const imagePath = `/upload/employee/${req.files.image[0].filename}`;

                const guides = new GuidesModel({
                    ...req.body,
                    image: imagePath
                });
            
                await guides.save();
                res.json({ status: true, message: "Guide created successfully.", data: guides });
            
            }
            
        } catch (err) {
            res.json({ status: false, message: err.message });
        }
    },
    search_datas: async (req, res, next) => {
        const result = new ToDoClass(GuidesModel, req, res, next);
        result.SearchData()
    },
    get_data: async (req, res, next) => {
        const result = new ToDoClass(GuidesModel, req, res, next);
        result.findById("header")
    },
    get_datas: async (req, res, next) => {
        const result = new ToDoClass(GuidesModel, req, res, next);
        result.findAll("header")
    },
    update_data: async (req, res, next) => {
        const result = new ToDoClass(GuidesModel, req, res, next);
        result.updateById()
    },
    update_image: async (req, res, next) => {
        try {
            if (!req.files || !req.files.image) {
                return res.json({ status: false, message: "Image is required." });
            }

            const { id } = req.params;
            let guides = await GuidesModel.findById(id);
            if (!guides) {
                return res.json({ status: false, message: "Guides article not found." });
            }

            // Get uploaded image file
            const newImageFile = req.files.image[0];
            const newImagePath = path.join(__dirname, `../../public/upload/employee/${newImageFile.filename}`);

            
            if (guides.image) {
                const oldImagePath = path.join(__dirname, `../../../public${guides.image}`);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath); 
                }
            }

            guides.image = `/upload/employee/${newImageFile.filename}`;
            await guides.save();

            return res.json({
                status: true,
                message: "Image updated successfully",
                data: guides
            });
        } catch (err) {
            res.json({ status: false, err: err.message });
        }
    },
    delete_data: async (req, res, next) => {
        try {
            const { id } = req.params;
            const GUIDES = await GuidesModel.findById(id);

            fs.unlink(path.join(__dirname, `../../../public${GUIDES.image}`), (error) => {  })

            if(GUIDES) {
                await GuidesModel.findByIdAndDelete(id);
                res.json({ status: true, data: null })
            }            
        }
        catch (error) {
            res.json({ status: false, message: error.message })
        }
    },
    delete_image: async (req, res, next) => {
        try {
            const { id } = req.params;
            const GUIDES = await GuidesModel.findById(id);

            fs.unlink(path.join(__dirname, `../../../public${GUIDES.image}`), (error) => {  })    
            const guides = await GuidesModel.findByIdAndUpdate(id)
            guides.image = "";
            await guides.save()
            res.json({
                status: true,
                data: guides
            })
        }
        catch (error) {
            res.json({ status: false, message: error.message })
        }
    },
    addView: async (req, res, next) => {
        const result = new ToDoClass(GuidesModel, req, res, next);
        result.addView();
    }
}