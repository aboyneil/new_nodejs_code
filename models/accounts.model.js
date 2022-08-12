const mongoose = require("mongoose");

const accounts = mongoose.model(
    "accounts",
    mongoose.Schema(
        {
        name: String,
        username: String,
        email: String,
        mobileNumber: String,
        password: String,
        },
        {
            timestamps: true,
        }
    )
);

module.exports = {
    accounts
}