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
	signupDate: {
		type: Date,
		default: Date.now,
	},
	avatar: {
		type: String,
	},
	pals: [
		{
			userHandle: {
				type: String,
			},
			userAvatar: {
				type: String,
			},
			acceptDate: {
				type: Date,
				default: Date.now,
			},
		},
	],
});

module.exports = User = mongoose.model('user', UserSchema);
