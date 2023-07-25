const jwt = require("jsonwebtoken");
const Account = require("../models/Account");

async function loginMiddleware(req, res, next) {
	try {
		const token = req.cookies.token;
		if (token) {
			const decoded = jwt.verify(token, "shhhh");
			const account = await Account.findById(decoded.userId);
			if (account) {
				req.user = account;
				res.locals.user = account;
				next();
			} else {
				next();
			}
		} else {
			next();
		}
	} catch (error) {
		console.log(error);
	}
}

module.exports = loginMiddleware;
