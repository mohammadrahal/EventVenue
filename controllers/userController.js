const db = require("../config/db");
const bcrypt = require("bcrypt");
// check event to see the onther way to get users
const getAllUsers = async (_, res) => {
  try {
    const [users] = await db.query(
      // not added password to not return it or get it show it
      "SELECT id, fullname, email,password, role FROM users"
    );
    res.status(200).json({
      success: true,
      message: "Users received successfully",
      data: users,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unable to get user data",
      error: error.message,
    });
  }
};

// by id
const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await getInfoById(id);
    return res.status(200).json({
      success: true,
      message: `User of id = ${id} data retrieved successfully `,
      data: response[0], //to get password
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: `Unable to get user by id = ${id}`,
      error: error.message,
    });
  } //to close catch
}; //to close the function

// register
const register = async (req, res) => {
  const { fullname, email, password } = req.body;
  const query = `INSERT INTO users (fullname, email, password) VALUES (?, ?, ?);`;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const [response] = await db.query(query, [fullname, email, hashedPassword]);
    const [data] = await getInfoById(response.insertId);

    res.status(200).json({
      success: true,
      message: `User registered successfully`,
      data: data,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: `Unable to register a new user`,
      error: error.message,
    });
  }
};

// update
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { fullname, email } = req.body;
  const query = `UPDATE users SET fullname= ?, email = ? WHERE id = ?`;

  try {
    const [response] = await db.query(query, [fullname, email, id]);
    if (!response.affectedRows)
      return res.status(400).json({
        success: false,
        message: `user not found`,
      });
    const data = await getInfoById(id);
    res.status(200).json({
      success: true,
      message: `User updated successfully`,
      data: data[0],
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Unable to update user`,
      error: error.message,
    });
  }
};

// login
const login = async (req, res) => {
  const { email, password } = req.body;
  const query = `SELECT * FROM users WHERE email = ?`;
  try {
    const [response] = await db.query(query, [email]);
    if (!response.length) {
      return res.status(404).json({
        success: false,
        message: `User with email ${email} not found`,
      });
    }
    const hashedPassword = response[0].password;
    const passwordMatch = await bcrypt.compare(password, hashedPassword);
    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Wrong password",
        userId: response[0].User_id,
      });
    }
    return res.status(200).json({
      success: true,
      message: `User with email logged in successfully`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Unable to login for user with email ${email}`,
      error: error.message,
    });
  }
};

// switch to admin
const switchAdmin = async (req, res) => {
  const { id } = req.params;
  const query = `UPDATE users SET role = 'admin' WHERE id = ?`;
  try {
    const [response] = await db.query(query, [id]);
    if (!response.affectedRows)
      return res.status(400).json({
        success: false,
        message: `User not found`,
      });
    const data = await getInfoById(id);
    res.status(200).json({
      success: true,
      message: `User with ID = ${id} switched to admin successfully`,
      data: data[0],
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: `Unable to switch to admin`,
      error: error.message,
    });
  }
};
// delete
const deleteUser = async (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM users WHERE id = ?`;
  try {
    const [response] = await db.query(query, [id]);
    if (!response.affectedRows)
      return res.status(400).json({
        success: false,
        message: `user not found`,
      });
    return res.status(200).json({
      success: true,
      message: `user deleted successfully`,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: `unabe to delete`,
      error: error.message,
    });
  }
};
// function to get the information from id full name eamil...
const getInfoById = async (id) => {
  const query = `SELECT id, fullname, email, role FROM users WHERE id = ?`;
  try {
    const response = await db.query(query, [id]);
    console.log(response);
    return response;
  } catch (error) {
    console.log(response);
    return error;
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  register,
  login,
  deleteUser,
  updateUser,
  switchAdmin,
};
