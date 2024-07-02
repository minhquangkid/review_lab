const express = require("express");

const router = express.Router();

const homeController = require("../controllers/adminController");

router.get("/home", homeController.getHome);

router.post("/add-user", homeController.addUser);

router.delete("/delete-user/:id", homeController.deleteUser);

module.exports = router;
