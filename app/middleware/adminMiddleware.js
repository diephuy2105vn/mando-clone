function adminMiddleware(req, res, next) {
	const user = req.user;
	if (user) {
		if (user.permission >= 2) {
			return next();
		}
	}

	res.status(500).render("error", {
		message: "Permisson Denied!",
	});
}

module.exports = adminMiddleware;
