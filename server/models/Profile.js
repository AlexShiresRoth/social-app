const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'user',
	},
	avatar: {
		type: String,
	},
	email: {
		type: String,
	},
	handle: {
		type: String,
	},
	bio: {
		type: String,
	},
	interests: [
		{
			name: {
				type: String,
			},
		},
	],
	pals: [
		{
			handle: {
				type: String,
			},
		},
	],
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
