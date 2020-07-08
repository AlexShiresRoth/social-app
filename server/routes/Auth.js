const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../models/User');

//@route POST route
//@desc login user
//@access public
router.post(
	'/',
	[
		check('email', 'Please enter your email').not().isEmpty(),
		check('email', 'Please enter a valid email').isEmail(),
		check('password', 'Please enter your password').not().isEmpty(),
	],
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { email, password } = req.body;

		const foundUser = await User.findOne({ email });

		console.log(foundUser);

		if (!foundUser) {
			return res.status(400).json({ msg: 'Could not find a user with that email' });
		}

		const match = await bcrypt.compare(password, foundUser.password);

		if (!match) {
			console.log('no match');
			return res.status(400).json({ msg: 'Password is incorrect' });
		}

		try {
			const payload = {
				user: {
					id: foundUser.id,
				},
			};

			jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 360000 }, (err, token) => {
				if (err) {
					return res.status(400).json({ msg: 'Something went wrong creating your access token' });
				}
				res.json(token);
			});
		} catch (error) {
			console.log(error);
			return res.status(500).json({ msg: 'Internal server error' });
		}
	}
);

module.exports = router;
