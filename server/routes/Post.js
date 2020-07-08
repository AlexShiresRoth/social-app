const express = require('express');
const Post = require('../models/Post');
const auth = require('../middleware/auth');
const router = express.Router();
const { check, validationResult } = require('express-validator');

//@route POST route
//@desc create post
//@access private
router.post('/', auth, [check('text', 'Please add some text to your post').not().isEmpty()], async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const { text, status } = req.body;

	const newPostFields = {};

	if (text) newPostFields.text = text;
	if (status) newPostFields.status = status;

	try {
		const createdPost = new Post(newPostFields);

		await createdPost.save();

		res.json(createdPost);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ msg: 'Internal Server Error' });
	}
});

module.exports = router;
