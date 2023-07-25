function index(req, res) {
	res.render("index");
}

function login(req, res) {
	res.render("login");
}

function register(req, res) {
	res.render("register");
}

function payment(req, res) {
	res.render("payment");
}

const SiteController = {
	index,
	login,
	register,
	payment,
};

module.exports = SiteController;
