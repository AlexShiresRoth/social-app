const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user',
	},
	text: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	status: {
		type: String,
	},
	author: {
		type: String,
	},
	userAvatar: {
		type: String,
	},
	tags: [
		{
			tagName: {
				type: String,
			},
		},
	],

	likes: [
		{
			user: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'users',
			},
			handle: {
				type: String,
			},
		},
	],
	comments: [
		{
			user: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'users',
			},
			text: {
				type: String,
				required: true,
			},
			name: {
				type: String,
			},
			avatar: {
				type: String,
			},
			date: {
				type: Date,
				default: Date.now,
			},
		},
	],
});

module.exports = Post = mongoose.model('post', PostSchema);
