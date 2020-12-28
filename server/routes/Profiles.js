const express = require('express');
const { validationResult, check } = require('express-validator');
const auth = require('../middleware/auth');
const Profile = require('../models/Profile');
const ImageKit = require('imagekit');
const router = express.Router();

const imagekit = new ImageKit({
	publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
	privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
	urlEndpoint: process.env.IMAGE_KIT_URL,
});

//@route GET Route
//@desc get a profile
//@access private
router.get('/myprofile', auth, async (req, res) => {
	console.log('THIS IS THE REQ', req.user);
	const foundProfile = await Profile.findById(req.user.id);

	if (!foundProfile) {
		return res.status(400).json({ msg: 'Could not locate your profile' });
	}
	try {
		res.json(foundProfile);
	} catch (error) {
		console.error(error);
		res.status(500).json({ msg: 'Internal Server Error' });
	}
});

//@route POST route
//@desc upload avatar image to imagekit and save url in db
//@access private
router.post('/uploadavatar', auth, [check('url', 'Please upload an avatar').not().isEmpty()], async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.json({ errors: errors.array() });
	}

	const { url } = req.body;

	const profileFields = {};

	if (url) profileFields.avatar = url;

	const foundProfile = await Profile.findById(req.user.id);

	if (foundProfile) {
		foundProfile.avatar = url;
		foundProfile.save();
		return res.json(foundProfile);
	}
	try {
		profileFields.user = req.user.id;
		const newProfile = new Profile(profileFields);

		await newProfile.save();
		console.log('new profile created', newProfile);
		res.json(newProfile);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ msg: 'Internal Server Error' });
	}
});
//@route GET route
//@desc handle authentication for imagekit
//@access private
router.get('/authenticateupload', async (req, res) => {
	try {
		const authenticationParameters = imagekit.getAuthenticationParameters();
		console.log(authenticationParameters);
		return res.json(authenticationParameters);
	} catch (error) {
		console.log(error);
		res.status(500).json({ msg: 'Internal Server Error' });
	}
});

//@route POST route
//@desc create profile
//@access private
router.post('/createprofile', check());

module.exports = router;
