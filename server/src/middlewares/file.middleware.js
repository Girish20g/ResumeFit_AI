const multer = require("multer");

const storage = multer.memoryStorage();

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === "application/pdf") {
            cb(null, true);
        } else {
            cb(new Error("Invalid file type"));
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 5 //5MB 
    }
});

module.exports = upload;