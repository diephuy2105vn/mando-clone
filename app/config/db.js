const mongoose = require("mongoose");

async function connect() {
	try {
		await mongoose.connect("mongodb://127.0.0.1/mando_clone", {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log("Connect mongodb successfully!");
	} catch (error) {
		console.log(error);
	}
}

module.exports = { connect };
