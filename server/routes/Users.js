const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');
const config = require('config');
const router = express.Router();
const gravatar = require('gravatar');
const { check, validationResult } = require('express-validator');

//TODO setup password reset
//TODO setup email reset
//TODO create a route for email verification, send a code to user email and have user enter the code in the next step

//@route POST route
//@desc Create a user
//@access public
router.post(
	'/',
	[
		check('email', 'Please enter your email').not().isEmpty(),
		check('email', 'Please enter a valid email').isEmail(),
		check('password', 'Please enter a password').not().isEmpty(),
		check('password', 'Please create a password a minimum of 6 characters').isLength({ min: 6 }),
		check('passwordTwo', 'Please confirm your password').not().isEmpty(),
		check('handle', 'Please enter a user handle').not().isEmpty(),
	],
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { email, password, passwordTwo, handle, adminCode } = req.body;

		const foundUser = await User.findOne({ email });

		if (foundUser) {
			return res.status(400).json({ msg: 'A user with that email already exists' });
		}

		if (password !== passwordTwo) {
			return res.status(400).json({ msg: 'Passwords do not match' });
		}

		try {
			const avatar = gravatar.url(email, {
				s: '200',
				r: 'pg',
				d: 'mm',
			});
			const newUser = new User({
				email,
				handle,
				avatar,
				userRole: 'User',
			});

			const salt = await bcrypt.genSalt(10);

			newUser.password = await bcrypt.hash(password, salt);

			if (adminCode === process.env.ADMIN_CODE) newUser.userRole = 'Admin';

			await newUser.save();

			const payload = {
				user: {
					id: newUser.id,
				},
			};

			console.log(newUser);
			jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 360000 }, (err, token) => {
				if (err) throw err;
				res.json({ token });
			});
		} catch (error) {
			console.log(error);
			return res.status(500).json({ msg: 'Internal Server Error' });
		}
	}
);

//@route POST ROute
//@desc edit user
//@access private
router.post('/edit', auth, async (req, res) => {
	const foundUser = await User.findById(req.user.id);

	const { handle, email, avatar } = req.body;

	if (!foundUser) {
		return res.status(400).json({ msg: 'Could not locate user' });
	}
	if (!avatar) {
		const newAvatar = gravatar.url(email, {
			s: '200',
			r: 'pg',
			d: 'mm',
		});
		foundUser.avatar = newAvatar;
		await foundUser.save();
	}
	if (handle) foundUser.handle = handle;
	if (email) foundUser.email = email;
	if (avatar) foundUser.avatar = avatar;

	try {
		console.log(foundUser);
		await foundUser.save();
		return res.json(foundUser);
	} catch (error) {
		console.log(error);
		res.status(500).json({ msg: 'Internal Server Error' });
	}
});

//@route GET route
//@desc get all users
//@access private

//TODO figure out why only returning one user
router.post('/searchusers', auth, async (req, res) => {
	const foundUsers = await User.find();

	const { searchTerm } = req.body;

	if (foundUsers.length === 0 || !foundUsers) {
		return res.status(400).json({ msg: 'Could not locate users' });
	}

	try {
		const searchReg = new RegExp(searchTerm, 'i');

		const matches = foundUsers.map((user) => {
			console.log(user.handle);
			return searchReg.match(user.handle);
		});
		res.json(matches);
	} catch (error) {
		res.status(500).json({ msg: 'Internal Server Error' });
	}
});

//@route GET ROUTE
//@desc get user
//@access private
router.get('/', auth, async (req, res) => {
	const foundUser = await User.findById(req.user.id).select('-password');

	if (!foundUser) {
		return res.status(400).json({ msg: 'Could not locate a user' });
	}

	console.log('We found the user', foundUser);
	try {
		res.json(foundUser);
	} catch (error) {
		console.log(error);
		res.status(500).json({ msg: 'Internal Server Error' });
	}
});

module.exports = router;
