const userController = require('../controllers/user.controller');

const express = require('express');
const router = express.Router();

router.put("/", userController.updateUser);
router.delete("/:id", userController.deleteUser);

router.get("/", userController.getAllUsers);
router.get("/:email", userController.getUserByEmail);

router.post("/register", userController.createUser);
router.post("/topUp", userController.userTopUp);
router.post("/login", userController.login);

module.exports = router;