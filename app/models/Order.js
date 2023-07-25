const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Order = new Schema({
    name: {type: String, required: true},
    idUser: String,
    phone: {type: String, required: true},
    email: {type: String, required: true},
    address: {type: String, required: true},
    paymentMethod: {type: String, required: true},
    total: {type: String, require: true},
    status: {type: String},
}, {
    timestamps: true,
    versionKey: false,
});

module.exports = mongoose.model("Order", Order);