const router = require("express").Router();
const userRoutes = require("./userRoutes");
const youthRoutes = require("./youthRoutes");

router.use("/users", userRoutes);
router.use("/youths", youthRoutes);

module.exports = router;
