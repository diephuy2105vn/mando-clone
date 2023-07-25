function checkAccessMiddleware(req, res, next) {
	if (req.headers["x-fetch"]) {
		return next();
	}

	const user = req.user;
	if (!user) {
		res.status(500).render("error", {
			message: "Bạn cần đăng nhập để vào trang này",
		});
		return;
	}

	if (user.permission >= 2) {
		return next();
	}

	res.status(500).render("error", {
		message: "Bạn không đủ quyền truy cập vào trang này",
	});
}

module.exports = checkAccessMiddleware;
