const bcrypt = require("bcrypt");
const Account = require("../models/Account");
const jwt = require("jsonwebtoken");
async function login(req, res, next) {
	try {
		const account = await Account.findOne({ username: req.body.username.toLowerCase() });
		if (account) {
			const isValidPassword = await bcrypt.compare(req.body.password, account.password);
			if (isValidPassword) {
				var token = jwt.sign({ userId: account._id }, "shhhh");
				res.cookie("token", token);
				res.json({ status: "Success", element: "Đăng nhập thành công!" });
			} else {
				res.json({ status: "Faile", element: "Tài khoản hoặc mật khẩu không đúng vui lòng kiểm tra lại!" });
			}
		} else {
			res.json({ status: "Faile", element: "Tài khoản không tồn tại vui lòng kiểm tra lại!" });
		}
	} catch (error) {
		res.json({ status: "Error", element: "Đã có lỗi xảy ra vui lòng thử lại sau..." });
	}
}

async function register(req, res, next) {
	try {
		req.body.username = req.body.username.toLowerCase();
		const account = await Account.findOne({ username: req.body.username });
		if (account) {
			res.json({ status: "Faile", element: "Tài khoản đã tồn tại xin vui lòng đăng ký tài khoản khác!" });
			return;
		}
		const newAccount = new Account(req.body);
		const salt = await bcrypt.genSalt(10);
		newAccount.password = await bcrypt.hash(newAccount.password, salt);
		newAccount.save();
		res.json({ status: "Success", element: "Đăng ký thành công bạn sẽ được chuyển đến trang đăng nhập" });
	} catch (error) {
		res.json({ status: "Error", element: "Đã có lỗi xảy ra vui lòng thử lại sau..." });
	}
}

const AccountController = {
	register,
	login,
};

module.exports = AccountController;
