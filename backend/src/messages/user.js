//login
const INVALID_PASSWORD = "Mật khẩu không đúng! Vui lòng thử lại.";
const INVALID_USER_PASSWORD = "Nhập email và mật khẩu! Vui lòng thử lại.";
const ACCOUNT_DEACTIVE = "Tài khoản của bạn đã bị vô hiệu hoá";

//register
const ACCOUNT_EXISTED = "Email đã tồn tại.";
const ACCOUNT_NOT_EXISTED = "Email không tồn tại.";
const ACCOUNT_CREATED = "Tạo tài khoảng thành công!";
const ACCOUNT_LOGIN = "Đăng nhập thành công!";
const OTP_GENERATED = "Tạo mã OTP đăng ký thành công!";
const OTP_EXPIRED = "OTP đã hết hạn";
const OTP_INVALID = "OTP không hợp lệ";
const OTP_VERIFIED = "Xác thực OTP thành công";

//change password
const CHANGE_PASSWORD_SUCCESS= "Đổi mật khẩu thành công";
const CURRENT_PASSWORD_WRONG = "Mật khẩu hiện tại không chính xác";
//update
const ACCOUNT_UPDATED = "Cập nhật tài khoản thành công!";

//delete
const ACCOUNT_DELETED = "Xóa tài khoản thành công!";

//logout
const ACCOUNT_LOGOUT = "Đăng xuất thành công";
const ACCOUNT_LOGOUT_FAILED = "Có lỗi xảy ra vui lòng thử lại!";

module.exports = {
	INVALID_PASSWORD,
	INVALID_USER_PASSWORD,
	ACCOUNT_LOGOUT_FAILED,
	ACCOUNT_EXISTED,
	ACCOUNT_CREATED,
	ACCOUNT_UPDATED,
	ACCOUNT_DELETED,
	ACCOUNT_LOGOUT,
	ACCOUNT_LOGIN,
	OTP_GENERATED,
	OTP_EXPIRED,
	OTP_INVALID,
	ACCOUNT_DEACTIVE,
	CURRENT_PASSWORD_WRONG,
	CHANGE_PASSWORD_SUCCESS,
	OTP_VERIFIED
};
