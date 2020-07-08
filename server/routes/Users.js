const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('config');
const router = express.Router();
const { check, validationResult } = require('express-validator');

//TODO setup password reset
//TODO setup email reset

//@route POST route
//@desc Create a user
//@access public
router.post(
	'/',
	[
		check('name', 'Please enter your name').not().isEmpty(),
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

		const { name, email, password, passwordTwo, handle, adminCode } = req.body;

		const foundUser = await User.findOne({ email });

		if (foundUser) {
			return res.status(400).json({ msg: 'A user with that email already exists' });
		}

		if (password !== passwordTwo) {
			return res.status(400).json({ msg: 'Passwords do not match' });
		}

		try {
			const newUser = new User({
				email,
				name,
				handle,
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

module.exports = router;
