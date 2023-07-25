const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const { create } = require("express-handlebars");
const logger = require("morgan");

const db = require("./app/config/db");
const orderRouter = require("./app/routes/order");
const productRouter = require("./app/routes/product");
const accountRouter = require("./app/routes/account");
const cartRouter = require("./app/routes/cart");
const adminRouter = require("./app/routes/admin");
const apiRouter = require("./app/routes/api");
const indexRouter = require("./app/routes/index");
const loginMiddleware = require("./app/middleware/loginMiddleware");
const adminMiddleware = require("./app/middleware/adminMiddleware");
const statusLoginMiddleware = require("./app/middleware/statusLoginMiddleware");
const checkAccessMiddleware = require("./app/middleware/checkAccessMiddleware");

// const collections = require('./app/routes/collections');
// const paymentRouter = require('./app/routes/payment');

db.connect();

const app = express();
const hbs = create({
	extname: "hbs",
	helpers: {
		sum: function (a, b) {
			return a + b;
		},
		firstArray: function (array, n) {
			return array.slice(0, n);
		},
		includes: function (array, value) {
			return array.includes(value);
		},
		equals: function (a, b) {
			return a === b;
		},
		getElementArray: function (array, index) {
			return array[index];
		},
		JSONstringify: function (object) {
			if (object) {
				return JSON.stringify(object);
			}
			return undefined;
		},
	},
	runtimeOptions: {
		allowProtoPropertiesByDefault: true,
		allowProtoMethodsByDefault: true,
	},
});

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
// View engine setup
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "./app/views"));

app.use(logger("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Router
// app.use('/payment', paymentRouter)
// app.use('/collections', collectionsRouter)

app.use(loginMiddleware);

app.use("/order", orderRouter);
app.use("/product", productRouter);
app.use("/account", accountRouter);
app.use("/admin", adminMiddleware, adminRouter);
app.use("/cart", statusLoginMiddleware, cartRouter);
app.use("/api", checkAccessMiddleware, apiRouter);
app.use("/", indexRouter);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};
	// Render the error page
	res.status(err.status || 500);
	res.render("error");
});

module.exports = app;
