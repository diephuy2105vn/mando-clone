const Product = require("../models/Product");
const Order = require("../models/Order");
const Cart = require("../models/Cart");
const { mutipleMongooseToObject, mongooseToObject } = require("../ulti/mongoose");
function storeProduct(req, res, next) {
	res.render("admins/storeProduct");
}

function createProduct(req, res, next) {
	res.render("admins/createProduct");
}

function updateProduct(req, res, next) {
	Product.findById(req.params.id)
		.then((product) => {
			res.render("admins/updateProduct", {
				product: mongooseToObject(product),
			});
		})
		.catch((error) => {
			console.log(error);
		});
}

function storeOrder(req, res, next) {
	res.render("admins/storeOrder");
}

function inforOrder(req, res, next) {
	Order.findById(req.params.id)
		.then(async (order) => {
			const cart = await Cart.find({ idOrder: order._id });
			return [cart, order];
		})
		.then(async ([cart, order]) => {
			const product = await Promise.all(cart.map((detail) => Product.findById(detail.idProduct)));
			const newCart = cart.map((detail, index) => {
				const newDetail = mongooseToObject(detail);
				newDetail.product = product[index];
				return newDetail;
			});
			res.render("admins/inforOrder", {
				order: mongooseToObject(order),
				cart: newCart,
			});
		})
		.catch((error) => {
			res.render("error", {
				message: error,
			});
		});
}

const AdminController = {
	storeProduct,
	createProduct,
	updateProduct,
	storeOrder,
	inforOrder,
};

module.exports = AdminController;
