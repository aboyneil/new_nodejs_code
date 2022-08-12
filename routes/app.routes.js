const accountsController = require("../controllers/accounts.controller");
const express = require("express");
const router  = express.Router();

router.post("/accounts", accountsController.create);
router.get("/accounts", accountsController.findAll);
router.get("/accounts/:id", accountsController.findOne);
router.put("/accounts/:id", accountsController.update);
router.delete("/accounts/:id", accountsController.delete);

module.exports = router; 