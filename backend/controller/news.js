
const { data } = require("jquery");
const NewsModel = require("../model/news");
const mongoose = require("mongoose");
const ToDoClass = require("../utils/class");

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

                const candidate = await NewsModel.findOne().sort({ createdAt: -1 });
                const params_number = candidate ? candidate.params_number + 1 : 10;
                
                const imagePath = `/upload/${req.files.image[0].filename}`;

                const imagesPaths = req.files.images ? req.files.images.map(file => `/upload/${file.filename}`) : [];
                const news = new NewsModel({
                    ...req.body,
                    image: imagePath,
                    images: imagesPaths,
                    params_number
                });
            
                await news.save();
                res.json({ status: true, message: "News created successfully.", data: news });
            
            }
            
        } catch (err) {
            res.json({ status: false, message: err.message });
        }
    },
    search_datas: async (req, res, next) => {
        const result = new ToDoClass(NewsModel, req, res, next);
        result.SearchData()
    },
    get_data: async (req, res, next) => {
        const result = new ToDoClass(NewsModel, req, res, next);
        result.findById("activity_page")
    },
    get_datas: async (req, res, next) => {
        const result = new ToDoClass(NewsModel, req, res, next);
        result.findAll("activity_page")
    },
    update_data: async (req, res, next) => {
        const result = new ToDoClass(NewsModel, req, res, next);
        result.updateById()
    },
    updateFile: async (req, res, next) => {
        try {
            const image = req.files;
            const images = image.map(item => item.filename);
    
            const extname = images[0].split(".").pop().toLowerCase();
            if (['jpg', 'png', 'jpeg', 'webp'].includes(extname)) {
                const data = await NewsModel.findById(req.params.id);
                if (!data) {
                    return res.json({ status: false, err: "No data found" });
                }
                for (let item of data.image) {
                    const filePath = path.join(__dirname, `../../public/`, item);
                    fs.unlink(filePath, () => {}); // Ignore errors
                }
    
                data.image = images;
                await data.save();
                return res.json({ status: true, data });
            } else {
                for (let item of images) {
                    const filePath = path.join(__dirname, `../../`, item);
                    fs.unlink(filePath, () => {});
                }
                return res.json({ status: false, err: "Invalid file type" });
            }
        } catch (error) {
            return res.json({ status: false, err: error.message });
        }
    },
    update_image: async (req, res, next) => {
        try {
            if (!req.files || !req.files.image) {
                return res.json({ status: false, message: "Image is required." });
            }
            const { id } = req.params;
            let news = await NewsModel.findById(id);
            if (!news) {
                return res.json({ status: false, message: "News article not found." });
            }
            const newImageFile = req.files.image[0];
            const newImagePath = path.join(__dirname, `../../public/upload/${newImageFile.filename}`);

            if (news.image) {
                const oldImagePath = path.join(__dirname, `../../public${news.image}`);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath); 
                }
            }

            news.image = `/upload/${newImageFile.filename}`;
            await news.save();

            return res.json({
                status: true,
                message: "Image updated successfully",
                data: news
            });
        } catch (err) {
            res.json({ status: false, err: err.message });
        }
    },
    update_images: async (req, res, next) => {
        try {
    
            if (!req.files || !req.files.images) {
                return res.json({ status: false, message: "Images are required." });
            }
    
            const { id } = req.params;
            const news = await NewsModel.findById(id);
            if (!news) {
                return res.json({ status: false, message: "Page not found." });
            }
            const imagesPaths = req.files.images.map(file => `/upload/${file.filename}`);
    
            if (news.images && news.images.length > 0) {
                await Promise.all(news.images.map(imagePath => {
                    return new Promise((resolve, reject) => {
                        fs.unlink(path.join(__dirname, `../../public${imagePath}`), (error) => {
                            if (error && error.code !== "ENOENT") reject(error);
                            else resolve();
                        });
                    });
                }));
            }
            news.images = imagesPaths;
            await news.save();
    
            res.json({
                status: true,
                data: news
            });
    
        } catch (err) {
            res.json({ status: false, message: err.message });
        }
    },
    delete_data: async (req, res, next) => {
        try {
            const { id } = req.params;
            const NEWS = await NewsModel.findById(id);

            fs.unlink(path.join(__dirname, `../../public${NEWS.image}`), (error) => {  })

            for (let i = 0; i <= NEWS.images.length; i++) {
                fs.unlink(path.join(__dirname, `../../public${NEWS.images[i]}`), (error) => {  })               
            }
            if(NEWS) {
                await NewsModel.findByIdAndDelete(id);
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
            const NEWS = await NewsModel.findById(id);

            fs.unlink(path.join(__dirname, `../../public${NEWS.image}`), (error) => {  })    
            const news = await NewsModel.findByIdAndUpdate(id)
            news.image = "";
            await news.save()
            res.json({
                status: true,
                data: news
            })
        }
        catch (error) {
            res.json({ status: false, message: error.message })
        }
    },
    delete_imagee: async (req, res) => {
        try {
            const { id } = req.params;
            const { imagePath } = req.body;
    
            if (!imagePath) {
                return res.json({ status: false, message: "Image path is required." });
            }
    
            const news = await NewsModel.findById(id);
            if (!news) {
                return res.json({ status: false, message: "Page not found." });
            }
    
            // Remove the image file from the server
            const fullPath = path.join(__dirname, `../../public${imagePath}`);
            fs.unlink(fullPath, (error) => {
                if (error) console.error("File deletion error:", error);
            });
    
            // Remove the image from the database array
            news.images = news.images.filter(img => img !== imagePath);
            await news.save();
    
            res.json({ status: true, message: "Image deleted successfully.", data: news });
        } catch (err) {
            res.status(500).json({ status: false, message: err.message });
        }
    },
    delete_images: async (req, res, next) => {
        try {
            const { id } = req.params;
            const NEWS = await NewsModel.findById(id);

            for (let i = 0; i <= NEWS.images.length; i++) {
                fs.unlink(path.join(__dirname, `../../public${NEWS.images[i]}`), (error) => {  })               
            }     
            const news = await NewsModel.findByIdAndUpdate(id)
            news.images = [];
            await news.save()
            res.json({
                status: true,
                data: news
            })
        }
        catch (error) {
            res.json({ status: false, message: error.message })
        }
    },
    addNewsView: async (req, res, next) => {
        const result = new ToDoClass(NewsModel, req, res, next);
        result.addView();
    }
}