const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    twitter_id: { type: String, required: true, unique: true },
    name: String,
    age: Number,
});

module.exports = mongoose.model("User", UserSchema);
