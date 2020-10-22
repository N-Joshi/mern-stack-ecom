const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        unique: true
    }
}, {
    timestamps: true
})


module.exports = mongoose.model('Category', categorySchema)