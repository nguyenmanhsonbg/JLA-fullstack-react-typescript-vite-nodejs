// Thành công
const CREATE_NOTI_SUCCESS = "Tạo thông báo thành công";
const UPDATE_NOTI_SUCCESS = "Cập nhật thông báo thành công";
const DELETE_NOTIS_SUCCESS = "Xóa thông báo thành công";
const GET_NOTI_SUCCESS = "Lấy thông báo thành công";

// Thất bại
const GET_NOTI_FAILED = "Không thể lấy thông báo";
const CREATE_NOTI_FAILED = "Không thể tạo thông báo";
const UPDATE_NOTI_FAILED = "Không thể cập nhật thông báo";
const DELETE_NOTIS_FAILED = "Không thể xóa thông báo";

// Thông điệp lỗi chung
const INVALID_NOTI_ID = "ID thông báo không hợp lệ";
const INVALID_NOTI_TYPE = "Loại thông báo không hợp lệ";
const INVALID_NOTI_GET_ID = "ID lấy thông báo không hợp lệ";

// Thông điệp kiểm tra
const TITLE_GUARD = "Tiêu đề phải là chuỗi không rỗng";
const CONTENT_GUARD = "Nội dung phải là chuỗi không rỗng";
const ID_GUARD = "ID nhận xét phải là số";
const IDS_GUARD = "Danh sách ID nhận xét không được rỗng";
const TARGET_ID_GUARD = "ID mục tiêu phải là số";
const SOURCE_ID_GUARD = "ID nguồn phải là số";
const READ_GUARD = "'is_read' phải là giá trị boolean";
const NOTI_DATE_GUARD = "'noti_data' phải có định dạng 'yyyy-MM-dd'";

module.exports = {
	CREATE_NOTI_SUCCESS,
	GET_NOTI_SUCCESS,
	UPDATE_NOTI_SUCCESS,
	DELETE_NOTIS_SUCCESS,
	CREATE_NOTI_FAILED,
	GET_NOTI_FAILED,
	UPDATE_NOTI_FAILED,
	DELETE_NOTIS_FAILED,
	INVALID_NOTI_ID,
	INVALID_NOTI_TYPE,
	INVALID_NOTI_GET_ID,
	TITLE_GUARD,
	CONTENT_GUARD,
	ID_GUARD,
	IDS_GUARD,
	TARGET_ID_GUARD,
	SOURCE_ID_GUARD,
	READ_GUARD,
	NOTI_DATE_GUARD,
};
