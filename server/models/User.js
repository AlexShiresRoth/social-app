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
	friendRequestsReceived: [
		{
			fromPersonId: {
				type: String,
				required: true,
			},
		},
	],
	friendRequestsSent: [
		{
			toPersonId: {
				type: String,
				required: true,
			},
		},
	],
	friendRequestsApproved: [
		{
			acceptedPersonId: {
				type: String,
				required: true,
			},
		},
	],
});

module.exports = User = mongoose.model('user', UserSchema);
