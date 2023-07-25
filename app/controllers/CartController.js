const Cart = require("../models/Cart");

function create(req, res, next) {
	req.body.isOrder = false;
	const detail = new Cart(req.body);
	detail
		.save()
		.then((data) => {
			res.status(200).send("Thêm vào giỏ hàng thành công");
		})
		.catch((error) => {
			res.status(500).send("Thêm sản phẩm thất bại");
		});
}

function update(req, res, next) {
	Cart.updateOne({ _id: req.params.id }, req.body)
		.then((data) => {
			res.status(200).send("Thêm vào giỏ hàng thành công");
		})
		.catch((error) => {
			res.status(500).send("Thêm sản phẩm thất bại");
		});
}

function destroy(req, res, next) {
	Cart.deleteOne({ _id: req.params.id })
		.then((data) => {
			res.status(200).send("Xóa thành công");
		})
		.catch((error) => {
			res.status(500).send("Xóa sản phẩm thất bại");
		});
}

const CartController = {
	create,
	update,
	destroy,
};

module.exports = CartController;
