const router = require('express').Router();
const { Mentor, Youth, Trade } = require('../../models');

//Get all mentors

router.get('/', async (req, res) => {
  try {
    const mentorData = await Mentor.findall();
    res.status(200).json(mentorData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get a single Mentor

router.get('/:id', async (req, res) => {
  try {
    const mentorData = await Mentor.findByPk(req.params.id, {
      //Join with Youth, using the Trades throug table
      include: [{ model: Youth, through: Trade, as: 'trade_match' }],
    });

    if (!mentorData) {
      res.status(404).json({ message: 'no mentor found!' });
      return;
    }
    res.status(200).json(mentorData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a Mentor

router.post('/', async (req, res) => {
  try {
    const mentorData = await Mentor.create(req.body);
    res.status(200).json(mentorData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Mentor login

router.post('/login', async (req, res) => {
  try {
    const mentorData = await Mentor.findOne({
      where: { email: req.body.email },
    });

    if (!mentorData) {
      res
        .status(400)
        .json({ message: 'Wrong Email or Password, Please try again!' });
      return;
    }
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Wrong Email or Password, Please try again!' });
      return;
    }

    req.session.save(() => {
      req.session.mentor_id = mentorData.id;
      req.session.logged_in = true;

      res.json({ mentor: mentorData, message: 'Welcome' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Mentor logout

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
