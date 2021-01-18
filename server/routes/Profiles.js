const express = require('express');
const { validationResult, check } = require('express-validator');
const auth = require('../middleware/auth');
const Profile = require('../models/Profile');
const ImageKit = require('imagekit');
const User = require('../models/User');
const { Users } = require('react-feather');
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
//@desc create profile with whatever the user submitted
//@access private
router.post('/createprofile', auth, async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.json({ errors: errors.array() });
	}

	const { url, requests, interests } = req.body;

	const profileFields = {};

	if (url) profileFields.avatar = url;
	if (requests && requests.length > 0) profileFields.friendRequests = requests;
	if (interests) profileFields.interests = interests;

	const foundProfile = await Profile.findById(req.user.id);
	//connect profile to use model
	const foundUser = await User.findById(req.user.id);

	if (foundProfile) {
		foundProfile.avatar = url;
		foundProfile.save();
		return res.json(foundProfile);
	}
	try {
		profileFields.user = req.user.id;
		profileFields.handle = foundUser.handle;
		profileFields.email = foundUser.email;
		const newProfile = new Profile(profileFields);

		await newProfile.save();
		console.log('new profile created', newProfile);
		res.json(newProfile);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ msg: 'Internal Server Error' });
	}
});
//@route POST Route
//@desc send a friend request
//@access private
//TODO setup an expiry on requests
router.post('/sendrequest', auth, async (req, res) => {
	const { requestId } = req.body;
	console.log('request id:', requestId);
	try {
		const foundPossibleFriend = await User.findById(requestId);
		const myProfile = await User.findById(req.user.id);
		if (!foundPossibleFriend) {
			return res.status(400).json({ msg: 'Could not send a request to this person' });
		}
		if (
			foundPossibleFriend.friendRequestsReceived.filter((request) => request.fromPersonId === req.user.id)
				.length > 0
		) {
			console.log('request has already been sent to this person');
			return res.status(400).json({ msg: 'Request already sent' });
		}
		//pass the person making the request's id
		foundPossibleFriend.friendRequestsReceived.push({ fromPersonId: req.user.id });
		//add the request to my profile
		myProfile.friendRequestsSent.push({ toPersonId: requestId });
		await myProfile.save();
		await foundPossibleFriend.save();

		const updatedPeople = await User.find();

		const peopleNotIncludingMyProfile = updatedPeople.filter((person) => {
			return person.id !== req.user.id;
		});

		res.json(peopleNotIncludingMyProfile);
	} catch (error) {
		console.error(error);
		res.status(500).json({ msg: 'Internal Server Error' });
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

module.exports = router;
