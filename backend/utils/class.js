const { error } = require("console");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

// const ObjectId = require("mongodb").ObjectId;

module.exports = class ToDoClass {
    constructor(Model, Request, Response, Next) {
        this.model = Model;
        this.req = Request;
        this.res = Response;
        this.next = Next;
    }

    // Yaratish
    async createData() {
        try {
            const body = { ...this.req.body };

            const candidate = await this.model.findOne().sort({ createdAt: -1 });
            const params_number = {
                params_number: candidate ? candidate.params_number + 1 : 100,
            };

            const result = new this.model({ ...body, ...params_number });
            await result.save();
            this.res.json({ status: true, data: result });
        } catch (error) {
            this.res.json({ status: false, message: error.message });
        }
    }
    // Alohida ID boyicha olish
    async findById(...populate) {
        try {
            const { id } = this.req.params;
            const result = await this.model.findById(id).populate([...populate]);
            this.res.json({ status: true, data: result });
        } catch (error) {
            this.res.json({ status: false, message: error.message });
        }
    }
    // Hammasini olish
    async findAll(...populate) {
        try {
            const { status } = this.req.query;
            let query = this.model.find({ status: { $in: status } });

            if (populate.length > 0) {
                populate.forEach((field) => {
                    if (field === "section") {
                        query = query.populate({
                            path: "section",
                            populate: { path: "header" },
                        });
                    } else {
                        query = query.populate(field);
                    }
                });
            }

            const result = await query;
            this.res.json({ status: true, data: result });
        } catch (error) {
            this.res.json({ status: false, message: error.message });
        }
    }
    async findAllActive(...populate) {
        try {
            const { active, status } = this.req.query;
            const result = await this.model
                .find({ active: { $in: active }, status: { $in: status } })
                .populate([...populate]);
            this.res.json({ status: true, data: result });
        } catch (error) {
            this.res.json({ status: false, message: error.message });
        }
    }
    async findOne(...populate) {
        try {
            const { key, value } = this.req.query;
            const result = await this.model
                .findOne({ [key]: value })
                .populate([...populate]);
            this.res.json({ status: true, data: result });
        } catch (error) {
            this.res.json({ status: false, message: error.message });
        }
    }

    async SearchData() {
        try {
            let dts = [];
            const { name, status, gmenu, header, link, department, address, section } = this.req.query;

            const keys = Object.keys(this.req.query);

            if (keys.includes("name")) {
                dts.push({ $match: { name: { $regex: name, $options: "i" } } });
            }
            if (keys.includes("gmenu")) {
                let gmenuQuery = gmenu;
                if (mongoose.Types.ObjectId.isValid(gmenu)) {
                    gmenuQuery = new mongoose.Types.ObjectId(gmenu);
                }
                dts.push({ $match: { gmenu: gmenuQuery } });
            }
            if (keys.includes("link")) {
                dts.push({ $match: { link: { $regex: link, $options: "i" } } });
            }
            if (keys.includes("header")) {
                dts.push({ $match: { header: { $regex: header, $options: "i" } } });
            }
            if (keys.includes("department")) {
                let departmentIds = Array.isArray(department) ? department : [department]; // Ensure it's an array
            
                try {
                    // Convert all department IDs to ObjectId
                    departmentIds = departmentIds.map(id => new mongoose.Types.ObjectId(id));
            
                    dts.push({ 
                        $match: { "department": { $in: departmentIds } } 
                    });
            
                } catch (error) {
                    return res.status(400).json({ status: false, error: "Invalid department ID format" });
                }
            }
            if (keys.includes("section")) {
                let departmentIds = Array.isArray(section) ? section : [section]; // Ensure it's an array
            
                try {
                    // Convert all department IDs to ObjectId
                    departmentIds = departmentIds.map(id => new mongoose.Types.ObjectId(id));
            
                    dts.push({ 
                        $match: { "section": { $in: departmentIds } } 
                    });
            
                } catch (error) {
                    return res.status(400).json({ status: false, error: "Invalid department ID format" });
                }
            }
            if (keys.includes("address")) {
                let departmentIds = Array.isArray(address) ? address : [address]; // Ensure it's an array
            
                try {
                    // Convert all department IDs to ObjectId
                    departmentIds = departmentIds.map(id => new mongoose.Types.ObjectId(id));
            
                    dts.push({ 
                        $match: { "address": { $in: departmentIds } } 
                    });
            
                } catch (error) {
                    return res.status(400).json({ status: false, error: "Invalid address ID format" });
                }
            }
            if (keys.includes("status")) {
                dts.push({ $match: { status: { $eq: status } } });
            }
            if (keys.includes("active")) {
                dts.push({ $match: { active: { $eq: active } } });
            }
            const data = await this.model.aggregate(dts);
            
            this.res.json({
                status: true,
                count: data.length,
                data: data,
            });
        } catch (error) {
            this.res.json({ status: false, error: error.message });
        }
    }

    // Alohida ID boyicha tahrirlash
    async updateById() {
        try {
    
            const { id } = this.req.params;
    
            if (!id) {
                return this.res.json({ status: false, error: "ID is required." });
            }
    
            const result = await this.model.findById(id);
            if (!result) {
                return this.res.json({ status: false, message: "News not found" });
            }
    
            Object.assign(result, this.req.body);
            await result.save();
    
            this.res.json({ status: true, data: result });
        } 
        catch (error) {
            this.res.json({ status: false, error: error.message });
        }
    }

    async addView() {
        try {
            const { id, page } = this.req.params;
            
            if (!id && !page) return false;
    
            let pageID = null;
    
            if (page) {
                const pageData = await this.model.findOne({ params_name: page });
                if (!pageData) return false;
                pageID = pageData._id.toString(); 
            }
            const viewID = pageID || id;
    
            if (!viewID) return false;
    
            const sessionKey = `viewed_${this.model.modelName}`;
            if (!this.req.session[sessionKey]) {
                this.req.session[sessionKey] = [];
            }
    
            if (this.req.session[sessionKey].includes(viewID)) {
                return false;
            }
    
            const model = await this.model.findById(viewID);
            if (!model) return false;
    
            model.views += 1;
            await model.save();

            this.req.session[sessionKey].push(viewID);
    
            return true;
        } catch (error) {
            console.error("Error adding view:", error);
            return false;
        }
    }

    async updateFile(key) {
        const next = this.next;
        const req = this.req;
        const res = this.res;
        const ModelSchema = this.model;
        const { id } = this.req.params;

        await ModelSchema.findById(id).exec(async (err, data) => {
            if (err) return res.json({ status: false, error: err.message });
            else {
                if (data == null || data == undefined || !data)
                    res.json({ status: false, message: "Deleted already" });
                else {
                    const files = data[key];
                    for (let item of files) {
                        const filePath = path.join(__dirname, `../public/` + item);
                        fs.unlink(filePath, function () {
                            [];
                        });
                    }
                }
            }
        });
        await ModelSchema.findByIdAndUpdate(id).exec(async (error, datas) => {
            if (error) return res.json({ status: false, error: error.message });
            else {
                if (datas == null || datas == undefined || !datas)
                    res.json({ status: false, message: "Deleted already" });
                else {
                    const files = req.files;
                    const arrayFiles = [];
                    for (let item of files) {
                        const { filename } = item;
                        arrayFiles.push(filename);
                    }
                    datas[key] = arrayFiles;
                    await datas
                        .save()
                        .then(() => res.json({ status: true }))
                        .catch((err) => res.json({ status: false, err: err.message }));
                }
            }
        });
    }

    async deleteFile(key, folder) {
        const next = this.next;
        const req = this.req;
        const res = this.res;
        const ModelSchema = this.model;

        const { id } = this.req.params;

        await ModelSchema.findById(id).exec(async (err, data) => {
            if (err) res.json({ status: false, err: err.message });
            else {
                if (data == null || data == undefined || !data)
                    res.json({ status: false });
                else {
                    const files = data[key];
                    for (let item of files) {
                        const filePath = path.join(
                            __dirname,
                            `../public/${folder}/` + item
                        );
                        fs.unlink(filePath, function () {
                            [];
                        });
                    }
                    await ModelSchema.findByIdAndDelete(id);
                    res.json({ status: true });
                }
            }
        });
    }
    // Alohida ID boyicha o'chirish
    async deleteById() {
        try {
            const { id } = this.req.params;
            await this.model.findByIdAndDelete(id);
            this.res.json({ status: true, data: null });
        } catch (error) {
            this.res.json({ status: false, message: error.message });
        }
    }
};
