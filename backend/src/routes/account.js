const express = require("express");
const { registerAccount,createUser, getListUser, updateUserById, deleteUserById, getUserById, loginAccount, verifyOtpThenCreateNewAccount,exitingAccount,recoverPassword, verifyOtp,verifyOtpRecoverPassword,getOtpExpiration,resendOtp, changePassword } =
	require("../controllers").account;
const { checkAuthAndRole } = require("../middleware/auth");
const { registerAccountSystem, logoutAccount } = require("../controllers/account");
const router = express.Router();

//login 
router.post("/login", loginAccount);

//register new account
router.post("/register", registerAccount);
router.post("/verify-otp-account-create", verifyOtpThenCreateNewAccount);
router.post("/resend-otp", resendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/verify-otp-for-recover-password", verifyOtpRecoverPassword);
router.post("/get-otp-expiration", getOtpExpiration);
router.post("/create-account-system", registerAccountSystem);

//forgot password
router.post("/check-exiting-account", exitingAccount);
router.post("/recover-password", recoverPassword);

//CRUD account
router.get("/account", checkAuthAndRole([1]), getListUser);
router.patch("/account/:account_id", checkAuthAndRole([1]), deleteUserById);
router.put("/account/:account_id", checkAuthAndRole([1, 2, 3, 4]), updateUserById);
router.put("/account/:account_id/change-password", checkAuthAndRole([1, 2, 3, 4]),changePassword);
router.get("/account/:account_id", checkAuthAndRole([1, 2, 3, 4]), getUserById);
router.post("/logout", checkAuthAndRole([1, 2, 3, 4]), logoutAccount);
router.post("/account", createUser);

module.exports = router;
