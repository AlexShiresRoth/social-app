const express = require('express');
const Post = require('../models/Post');
const auth = require('../middleware/auth');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../models/User');

//@route POST route
//@desc create post
//@access private
router.post('/', auth, [check('text', 'Please add some text to your post').not().isEmpty()], async (req, res) => {
	const errors = validationResult(req);

	const foundUser = await User.findById(req.user.id);

	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const { text, status, tags } = req.body;

	const newPostFields = {};

	if (text) newPostFields.text = text;
	if (status) newPostFields.status = status;
	if (tags) {
		//TODO finish adding tags
		const newTags = tags.split(' ');
		const regex = new RegExp('^[&]', 'i');

		const filterTags = newTags
			.filter((tag) => {
				return tag.match(regex);
			})
			.map((filteredTag) => {
				return { tagName: filteredTag };
			});

		console.log('THESE ARE THE TAGS', filterTags, tags);

		newPostFields.tags = filterTags;
	}
	newPostFields.user = req.user.id;
	newPostFields.author = foundUser.handle;
	newPostFields.userAvatar = foundUser.avatar;
	try {
		const createdPost = new Post(newPostFields);

		await createdPost.save();

		res.json(createdPost);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ msg: 'Internal Server Error' });
	}
});

//@route GET ROUTE
//@desc GET POSTS
//@access private
router.get('/', auth, async (req, res) => {
	const foundPosts = await Post.find();

	if (!foundPosts) {
		return res.status(400).json({ msg: 'Hmm something went wrong' });
	}

	try {
		res.json(foundPosts.reverse());
	} catch (error) {
		console.error(error);
		res.status(500).json({ msg: 'Internal Server Error' });
	}
});

//@route PUT route
//@desc like post
//@access private

//TODO test this route
router.put('/like/:id', auth, async (req, res) => {
	const foundPost = await Post.findById(req.params.id);
	const foundUser = await User.findById(req.user.id);
	if (!foundPost) {
		console.error(error);
		return res.status(400).json({ msg: 'Could not locate post' });
	}

	if (foundPost.likes.filter((like) => like._id.toString() === req.user.id).length > 0) {
		console.log(foundPost.likes.filter((like) => like._id.toString() !== req.user.id));

		const removedLikes = foundPost.likes.filter((like) => like._id.toString() !== req.user.id);
		foundPost.likes = removedLikes;
		await foundPost.save();
		return res.json(foundPost.likes);
	}

	try {
		foundPost.likes.push(foundUser);
		await foundPost.save();
		console.log(foundPost.likes);
		res.json(foundPost.likes);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ msg: 'Internal Server Errror' });
	}
});

//@route GET Route
//@desc get user post
//@access private
router.get('/getpost/:id', auth, async (req, res) => {
	const foundPost = await Post.findById(req.params.id);

	if (!foundPost) {
		return res.status(400).json({ msg: 'Could not locate post' });
	}

	try {
		console.log(foundPost);
		res.json(foundPost);
	} catch (error) {
		console.error(error);
		res.status(500).json({ msg: 'Internal Server Error' });
	}
});

//@route DELETE Route
//@desc Remove Post
//@access private
router.delete('/remove/:id', auth, async (req, res) => {
	const foundPost = await Post.findById(req.params.id);
	console.log(foundPost);
	if (!foundPost) {
		return res.status(400).json({ msg: 'Could not locate post' });
	}
	try {
		await foundPost.remove();
		return res.json({ msg: 'Post Was Removed' });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ msg: 'Internal Server Errror' });
	}
});

//@route POST route
//@desc add comment to post
//@access private
router.post('/comment/:id', auth, [check('text', 'Please add your comment').not().isEmpty()], async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const { text } = req.body;
	const foundPost = await Post.findById(req.params.id);
	const foundUser = await User.findById(req.user.id);

	if (!foundPost) {
		return res.status(400).json({ msg: 'Could not locate post' });
	}

	const commentBody = {
		text,
		user: req.user.id,
		avatar: foundUser.avatar,
		name: foundUser.handle,
	};
	console.log(commentBody);
	try {
		foundPost.comments.unshift(commentBody);
		await foundPost.save();

		console.log('This is some stuff:', req.user, text);
		res.json(foundPost);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ msg: 'Internal Server Error' });
	}
});
module.exports = router;
