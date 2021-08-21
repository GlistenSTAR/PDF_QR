const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const normalize = require('normalize-url');
const auth = require('../../middleware/auth');

const User = require('../../models/User');

// @route    GET api/users/getAllusers
// @desc     Register user
// @access   Public
router.get(
  '/getAllUsers',
  auth,
  async(req, res) => {
    try{
      const users = await User.find({'role' : { $lt :  2 }});
      res.json(users);
    } catch(err){
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post(
  '/',
  check('name', 'Name is required').notEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check(
    'password',
    'Please enter a password with 6 or more characters'
  ).isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      let same_name = await User.findOne({ name });
      
      if (same_name) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Same name already exists! Please write another name.' }] });
      }

      const avatar = normalize(
        gravatar.url(email, {
          s: '200',
          r: 'pg',
          d: 'mm'
        }),
        { forceHttps: true }
      );

      user = new User({
        name,
        email,
        avatar,
        password
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: '5 days' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route    PUT api/users
// @desc     change user role
// @access   Public
router.put(
  '/',
  auth,
  async(req, res) =>{
    user = await User.findById(req.body.id);
    user.role = !user.role;
    await user.save()
    .then(()=>res.json('success'))
    .catch(err =>console.log(err));
  }
);
module.exports = router;
