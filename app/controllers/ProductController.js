const Product = require("../models/Product");
const fs = require("fs");
const path = require("path");
const { mongooseToObject, mutipleMongooseToObject } = require("../ulti/mongoose");

function index(req, res) {
	res.render("product");
}

function create(req, res) {
	const product = new Product(req.body);
	req.body.images.forEach((img, index) => {
		const data = img.replace(/^data:image\/\w+;base64,/, "");
		const buffer = Buffer.from(data, "base64");
		const imagePath = path.join("public/images/products", `${product._id}${index}.png`);
		product.imagePath = [...product.imagePath, imagePath.replace("public\\", "")];
		fs.writeFile(imagePath, buffer, (err) => {
			if (err) throw err;
			console.log(`Image ${index} was saved to ${imagePath}`);
		});
	});
	product.save();
}

async function update(req, res, next) {
	try {
		const product = req.body;
		if (product.images) {
			product.imagePath = [];
			product.images.forEach((img, index) => {
				const data = img.replace(/^data:image\/\w+;base64,/, "");
				const buffer = Buffer.from(data, "base64");
				const imagePath = path.join("public/images/products", `${req.params.id}${index}.png`);
				product.imagePath = [...product.imagePath, imagePath.replace("public\\", "")];
				fs.writeFile(imagePath, buffer, (err) => {
					if (err) throw err;
					console.log(`Image ${index} was saved to ${imagePath}`);
				});
			});
		}
		await Product.updateOne({ _id: req.params.id }, product);
		res.json("Update successfully!");
	} catch (error) {
		console.log(error);
	}
}

async function destroy(req, res, next) {
	try {
		await Product.deleteOne({ _id: req.params.id });
		res.json("Delete successfully!");
	} catch (error) {
		console.log(error);
	}
}

function productOnly(req, res, next) {
	Product.findById(req.params.id)
		.then((product) => {
			res.render("productOnly", { product: product });
		})
		.catch((error) => {
			console.log(error);
		});
}

const ProductController = {
	index,
	create,
	update,
	destroy,
	productOnly,
};

module.exports = ProductController;
