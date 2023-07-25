function statusLoginMiddleware(req, res, next) {
	try {
		const user = req.user;
		if (user) {
			next();
		} else {
			throw new Error();
		}
	} catch (error) {
		res.redirect("/login");
	}
}

module.exports = statusLoginMiddleware;
