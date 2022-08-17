const userController = require("../controllers/user.controller");
const express = require("express");
const router  = express.Router();

router.post("/user", userController.create);
router.get("/user", userController.findAll);
router.get("/user/:id", userController.findOne);
router.put("/user/:id", userController.update);
router.delete("/user/:id", userController.delete);

module.exports = router; 