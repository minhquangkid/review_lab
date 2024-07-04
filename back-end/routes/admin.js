const express = require("express");

const router = express.Router();

const homeController = require("../controllers/adminController");

router.get("/home", homeController.getHome);

router.get("/get-products", homeController.getProducts);

router.post("/add-user", homeController.addUser);

router.post("/add-product", homeController.addProduct);

router.put("/update-user", homeController.editUser);

router.delete("/delete-user/:id", homeController.deleteUser);

router.post("/buy-product/:userId", homeController.buyProduct);

module.exports = router;
