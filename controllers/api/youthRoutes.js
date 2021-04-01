const router = require('express').Router();
const { Youth } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const youthData = await Youth.create(req.body);

    req.session.save(() => {
      req.session.youth_id = youthData.id;
      req.session.logged_in = true;

      res.status(200).json(youthData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const youthData = await Youth.findOne({ where: { email: req.body.email } });

    if (!youthData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await youthData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.youth_id = youthData.id;
      req.session.logged_in = true;
      
      res.json({ user: youthData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

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