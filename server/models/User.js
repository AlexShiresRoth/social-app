const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	handle: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	userRole: {
		type: String,
		default: 'User',
	},
});

module.exports = User = mongoose.model('user', UserSchema);
