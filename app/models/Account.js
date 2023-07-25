const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Account = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    permission: {type: String, required: true},
}, {
    timestamps: true,
    versionKey: false,
});

module.exports = mongoose.model("Account", Account);