const router = require("express").Router();
const userRoutes = require("./userRoutes");
const mentorRoutes = require("./mentorRoutes");
const youthRoutes = require("./youthRoutes");

router.use("/users", userRoutes);
router.use("/mentors",mentorRoutes);
router.use("/youths", youthRoutes);

module.exports = router;
