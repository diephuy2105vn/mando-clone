const Order = require("../models/Order");
const Cart = require("../models/Cart");
async function create(req, res) {
	const order = new Order(req.body);
	for (const detail of req.body.cart) {
		if (detail._id) {
			const cart = await Cart.findById(detail._id);
			if (cart) {
				cart.idOrder = order._id;
				await cart.save();
				break;
			}
		}
		const newCart = new Cart(detail);
		newCart.idOrder = order._id;
		newCart.save();
	}
	order
		.save()
		.then(() => {
			res.status(200).json({ status: "Success", element: "Đặt hàng thành công" });
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({ status: "Error", element: "Đã có lỗi xảy ra" });
		});
}

function update(req, res, next) {
	Order.findOneAndUpdate({ _id: req.params.id }, req.body)
		.then((order) => {
			res.status(200).json({ status: "Success", element: "Lưu đơn hàng thành công" });
		})
		.catch((error) => {
			res.status(500).json({ status: "Error", element: "Đã có lỗi xảy ra" });
		});
}

function confirm(req, res, next) {
	Order.findByIdAndUpdate(req.params.id, {
		$set: {
			status: "Xác nhận",
		},
	})
		.then((order) => {
			res.status(200).json({ status: "Success", element: "Đơn hàng đã được xác nhận" });
		})
		.catch((error) => {
			res.status(500).json({ status: "Error", element: "Đã có lỗi xảy ra" });
		});
}

const OrderController = {
	create,
	update,
	confirm,
};

module.exports = OrderController;
