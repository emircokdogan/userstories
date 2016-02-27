/**
 * Created by emir on 26.2.2016.
 */
var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var bycrypt = require("bcrypt-nodejs");

var UserSchema = new Schema({
    name: String,
    username: {type: String, required: true, index: {unique: true}},
    password: {type: String, required: true, select: false}
});

UserSchema.pre("save", function (next) {
    var user = this;

    if (!user.isModified("password"))
        return next();

    bycrypt.hash(user.password, null, null, function (err, hash) {
        if (err)
            return next(err);

        user.password = hash;
        next();

    });

});

UserSchema.methods.comparePassword = function (password) {
    var user = this;

    return bycrypt.compareSync(password, user.password);
};

module.exports = mongoose.model("User", UserSchema);