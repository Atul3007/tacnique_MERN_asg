const express = require("express");
const { getUsers, addUser, editUser, deleteUser, getUserById } = require("../controller/userController");

const router = express.Router();

router.get('/all-users',getUsers);
router.get("/by-id/:id",getUserById);
router.post("/add-user",addUser);
router.patch("/edit-user/:id",editUser);
router.delete("/delete-user/:id",deleteUser); 

module.exports = {
  router,
};
