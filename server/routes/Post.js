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

//@route PUT route
//@desc like post
//@access private

//TODO test this route
router.put('/post/:id', auth, async (req, res) => {
	const foundPost = await Post.findById(req.params.id);

	if (!foundPost) {
		return res.status(400).json({ msg: 'Could not locate post' });
	}

	if (foundPost.likes.filter((post) => post.user === req.user.id).length > 0) {
		foundPost.likes.filter((post) => post.user !== req.user.id);
		await foundPost.save();
		return res.json(foundPost);
	}

	try {
		foundPost.likes.push(req.user);
		await foundPost.save();
		res.json(foundPost);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ msg: 'Internal Server Errror' });
	}
});

module.exports = router;
