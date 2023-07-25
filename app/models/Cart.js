const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Cart = new Schema({
    idUser: {type: String},
    idOrder: {type: String},
    idProduct: {type: String, required: true},
    size: {type: String, required: true},
    color: {type: String, require: true},
    quantity: {type: Number, require: true},
}, {
    timestamps: true,
    versionKey: false,
});

module.exports = mongoose.model("Cart", Cart);