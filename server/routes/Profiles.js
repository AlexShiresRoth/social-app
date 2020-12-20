const express = require('express');
const { validationResult, check } = require('express-validator');
const auth = require('../middleware/auth');
const Profile = require('../models/Profile');
const router = express.Router();

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
//@desc create profile
//@access private
router.post('/createprofile', check());

module.exports = router;
