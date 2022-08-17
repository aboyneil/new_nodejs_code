const mongoose = require("mongoose");

const User = mongoose.model(
    "User",
    mongoose.Schema(
        {
        name: {
            type: String,
            require: true,
        },
        username: {
            type: String,
            require: true,
            unique: true,

        },
        email: {
            type: String,
            require: true,
            unique: true,

        },
        mobileNumber: String,
        password: String,
        },
        {
            timestamps: true,
        }
    )
);

module.exports = {
    User
}