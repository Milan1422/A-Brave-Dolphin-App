const router = require("express").Router();
const { Project, User, Youth, Mentor } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    res.render("homepage", {
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get("/profile", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const youthData = await Youth.findByPk(req.session.youth_id, {
      attributes: { exclude: ["password"] },
    });

    const youth = youthData.get({ plain: true });

    res.render("profile", {
      ...youth,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/signup", async (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }

  res.render("signUp");
 
});

router.get("/mentorprofile", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const mentorData = await Mentor.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
    });

    const mentor = mentorData.get({ plain: true });

    res.render("mentorprofile", {
      ...mentor,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }

  res.render("login");
});

// route for chat room
router.get("/chat", withAuth, async (req, res) => {
  try {
    const youthData = await Youth.findByPk(req.session.youth_id, {
      attributes: { exclude: ["password"] },
    });

    const youth = youthData.get({ plain: true });

    res.render("chat", {
      ...youth,
      logged_in: true,
    });
    
  } catch (err) {
    res.status(500).json(err);
  }

});

module.exports = router;
