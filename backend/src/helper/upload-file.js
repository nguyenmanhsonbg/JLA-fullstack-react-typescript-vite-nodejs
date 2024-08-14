const multer = require("multer");

// Cấu hình nơi lưu trữ và tên file
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "uploads/"); // Thư mục lưu file
	},
	filename: (req, file, cb) => {
		const fileExt = file.originalname.split(".").pop();
		const filename = file.originalname.replace(/\.[^/.]+$/, "");
		cb(null, `${filename}-${Date.now()}.${fileExt}`);
	},
});

const upload = multer({ storage: storage });

module.exports = upload;
