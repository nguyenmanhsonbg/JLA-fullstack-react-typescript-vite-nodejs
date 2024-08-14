const uploadFileIntoTheServer = (req, res) => {
	try {
		res.json({ success: true, filePath: `http://localhost:5000/uploads/${req.file.filename}` });
	} catch (error) {
		console.log(error);
		res.status(400).send("Lỗi khi upload files");
	}
};

module.exports = {
	uploadFileIntoTheServer,
};
