const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    fullname: { type: String, required: true, unique: true },
    photo: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    active: { type: Boolean, required: true },
    rol: {type: String, required: true},//USER,ADMIN
    create_at: { type: Date, required: true, default: Date.now },
    update_at: { type: Date, required: false, default: Date.now },
});

module.exports = mongoose.model('user', UserSchema);