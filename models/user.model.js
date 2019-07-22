const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.set('debug', true);
let UserSchema = new Schema({
    name: {type: String, required: true, max: 100},
    user_name: {type: String, required: true},
    email: String,
    password: String,
    active: {type: Boolean, default: false}
});


// Export the model
module.exports = mongoose.model('User', UserSchema);