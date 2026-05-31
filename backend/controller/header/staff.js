const StaffModel = require("../../model/header/staff");
const ToDoClass = require("../../utils/class");

const fs = require("fs");
const path = require("path");

module.exports = {
    create: async (req, res, next) => {
        try {
            if (!req.files.image) {
                return res.json({ status: false, message: "Image is required." });
            }
            else {
                
                const imagePath = `/upload/employee/${req.files.image[0].filename}`;

                const staff = new StaffModel({
                    ...req.body,
                    image: imagePath
                });
            
                await staff.save();
                res.json({ status: true, message: "Guide created successfully.", data: staff });
            
            }
            
        } catch (err) {
            res.json({ status: false, message: err.message });
        }
    },
    search_datas: async (req, res, next) => {
        const result = new ToDoClass(StaffModel, req, res, next);
        result.SearchData()
    },
    get_data: async (req, res, next) => {
        const result = new ToDoClass(StaffModel, req, res, next);
        result.findById("department", "address")
    },
    get_datas: async (req, res, next) => {
        const result = new ToDoClass(StaffModel, req, res, next);
        result.findAll("department", "address")
    },
    update_data: async (req, res, next) => {
        const result = new ToDoClass(StaffModel, req, res, next);
        result.updateById()
    },
    update_image: async (req, res, next) => {
        try {
            if (!req.files || !req.files.image) {
                return res.json({ status: false, message: "Image is required." });
            }

            const { id } = req.params;
            let staff = await StaffModel.findById(id);
            if (!staff) {
                return res.json({ status: false, message: "staff article not found." });
            }

            // Get uploaded image file
            const newImageFile = req.files.image[0];
            const newImagePath = path.join(__dirname, `../../public/upload/employee/${newImageFile.filename}`);

            
            if (staff.image) {
                const oldImagePath = path.join(__dirname, `../../../public${staff.image}`);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath); 
                }
            }

            staff.image = `/upload/employee/${newImageFile.filename}`;
            await staff.save();

            return res.json({
                status: true,
                message: "Image updated successfully",
                data: staff
            });
        } catch (err) {
            res.json({ status: false, err: err.message });
        }
    },
    delete_data: async (req, res, next) => {
        try {
            const { id } = req.params;
            const staff = await StaffModel.findById(id);

            fs.unlink(path.join(__dirname, `../../../public${staff.image}`), (error) => {  })

            if(staff) {
                await StaffModel.findByIdAndDelete(id);
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
            const STAFF = await StaffModel.findById(id);

            fs.unlink(path.join(__dirname, `../../../public${STAFF.image}`), (error) => {  })    
            const staff = await StaffModel.findByIdAndUpdate(id)
            staff.image = "";
            await staff.save()
            res.json({
                status: true,
                data: staff
            })
        }
        catch (error) {
            res.json({ status: false, message: error.message })
        }
    },
}