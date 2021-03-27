const router = require("express").Router();
const userRoutes = require("./userRoutes");
const mentorRoutes = require("./mentorRoutes");

router.use("/users", userRoutes);
router.use("/mentors",mentorRoutes);

module.exports = router;
