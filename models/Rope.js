const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RopeSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    name: {
        type: String,
        required: true
    },
    grade: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Rope = mongoose.model('rope', RopeSchema);