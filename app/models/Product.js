const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Product = new Schema({
    name: String,
    price: Number,
    description: String,
    type: String,
    sizes: Array,
    colors: Array,
    imagePath: Array,
}, {
    timestamps: true,
    versionKey: false,
});

module.exports = mongoose.model("Product", Product);
