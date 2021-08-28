const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');
const sendEmail = require('./Sendmail');

// @route    GET api/auth
// @desc     Get user by token
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/auth
// @desc     Authenticate user & get token
// @access   Public
router.post(
  '/',
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      if(user.role < 1){
        return res
          .status(400)
          .json({ errors: [{ msg: 'Please waiting admin accept!' }] });
      }

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
          res.json({ token, name:user.name });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);
//forgot password
router.post(
    '/forgot',
    check('email', 'Please include a valid email').isEmail(),
    async (req, res) =>{
        const { email } = req.body;
        try {
          let user = await User.findOne({email: email});
          if(!user){
              console.log("it's not registed")
              return res
                  .status(400)
                  .json({ errors: [{ msg: 'Please check your email. It\'s not registerd email.' }] });
          }

          const content = {
            Subject: "Tu cita en Chigui",
            HTMLPart: "<div style='font-family:'PT Sans',Helvetica,Arial;max-width:700px; width: 100%;margin-left: auto;margin-right: auto;'>\
                         Hello, "+ user.name +"! This is your recovery password link.<br>"
                         +"http://3.16.143.216/change_password?id="+user.id+"\
                        </div>",
            TextPart: "",
            CustomID: ""
          }
          sendEmail(req.body.email, content)
          return res.json({msg: "success sended!"})

        } catch (err) {
          console.error(err.message);
          res.status(500).send('Server error');
        }
    });

//change the password
router.post(
  '/getUser',
  async (req, res) => {
    const { id } = req.body;
    try {
      let user = await User.findById(id);
      if(!user){
        return res
                  .status(400)
                  .json({ errors: [{ msg: 'This is wrong user' }] });
      }
      return res.json(user);
    } catch {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  })

//change with new password
router.post(
  '/save_password',
  async (req, res) => {
    const {id, new_password} = req.body
    try {
      let user = await User.findById(id);
      if(!user){
        return res
                  .status(400)
                  .json({ errors: [{ msg: 'This is wrong user' }] });
      }
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(new_password, salt);
      await user.save()
      .then(()=>{
        return res.json({msg: "success sended!"})
      });

    } catch {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  })

module.exports = router;
