const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, {
    timestamps: true
});

//Encrypt password
UserSchema.methods.encryptPassword = async password => {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
}

UserSchema.methods.matchPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

/*
UserSchema.methods.toJSON = function() {
    const { __v, password, ...user } = this.Object();

    return user;
}
*/

module.exports = model('User', UserSchema);