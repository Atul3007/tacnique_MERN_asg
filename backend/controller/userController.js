const userModel = require("../models/userModel");

const getUsers = async (req, res) => {
  const limit = parseInt(req.query._limit, 10) || 6;
  const page = parseInt(req.query._page, 10) || 1;

  try {
    const data = await userModel
      .find()
      .limit(limit)
      .skip((page - 1) * limit);

    const totalCount = await userModel.countDocuments();
    const hasMore = totalCount > page * limit;

    res.json({ data, hasMore });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
  
const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    //  console.log(id)
    const data = await userModel.findById(id);
    if (!data) {
      res.status(404).json({ msg: "User not found" });
      return;
    }
    res.status(200).json({ data });
  } catch (error) {
    console.log({ err: error, msg: "error in getting users data" });
  }
};

const addUser = async (req, res) => {
  try {
    const { name, city, company, mail } = req.body;
    const obj = { name, city, company, email: mail };
    //  console.log(obj)
    const newUser = new userModel(obj);
    await newUser.save();
    const result = await userModel.find();
    res.status(200).json({ msg: "Data inserted successfully", result });
  } catch (error) {
    console.log({ err: error, msg: "error in adding users data" });
  }
};

const editUser = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, city, company, mail } = req.body;
    const obj = { name, city, company, mail };
    await userModel.findByIdAndUpdate(id, obj);
    const result = await userModel.find();
    //console.log(result)
    res.status(200).json({ msg: "Data updated successfully", result });
  } catch (error) {
    console.log({ err: error, msg: "error in editing users data" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await userModel.findByIdAndDelete(id);
    res.status(200).json({ msg: "Data deleted successfully" });
  } catch (error) {
    console.log({ err: error, msg: "error in deleting users data" });
  }
};

module.exports = {
  getUsers,
  getUserById,
  addUser,
  editUser,
  deleteUser,
};
