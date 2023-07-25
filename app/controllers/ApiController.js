const Product = require("../models/Product");
const Cart = require("../models/Cart");
const Order = require("../models/Order");
const { mutipleMongooseToObject, mongooseToObject } = require("../ulti/mongoose");
function productApi(req, res, next) {
	const SIZEPAGE = req.query.sizepage || 20;
	const SKIPPAGE = (req.query.page - 1) * SIZEPAGE || 0;
	const TYPE = req.query.type || null;
	Product.find(TYPE ? { type: TYPE } : {})
		.skip(SKIPPAGE)
		.limit(SIZEPAGE)
		.then((products) => {
			const newProducts = mutipleMongooseToObject(products);
			res.json(newProducts);
		})
		.catch((error) => {
			res.json({ status: "Error", element: `${error}` });
		});
}

function productOnlyApi(req, res, next) {
	Product.findById(req.params.id)
		.then((product) => {
			res.json(product);
		})
		.catch((error) => {
			res.json({ status: "Error", element: `${error}` });
		});
}

function cartOfUserApi(req, res, next) {
	const type = req.query.type || null;
	Cart.find({ idUser: req.params.idUser, type })
		.then((cart) => {
			res.json(cart);
		})
		.catch((error) => {
			res.json({ status: "Error", element: `${error}` });
		});
}

function orderApi(req, res, next) {
	Order.find({})
		.then((order) => {
			res.json(order);
		})
		.catch((error) => {
			res.json({ status: "Error", element: `${error}` });
		});
}

const ApiController = {
	productOnlyApi,
	productApi,
	cartOfUserApi,
	orderApi,
};

module.exports = ApiController;
