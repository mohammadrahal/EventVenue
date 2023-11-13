const db = require("../config/db");

const getAllUsers = async (req, res) => {
  try {
    const [users] = await db.query("SELECT * FROM users");
    res.status(200).json({
      success: true,
      message: "Users received successfully",
      data: users,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Unable to get user data',
      error: error.message,
    });
  }
};


// adduser

const addUser = async (res,req) =>{
    const { fullname, email, password, role } = req.body;
    try {
        const [user] = await db.query(`INSERT INTO users (fullname, password, email Role) VALUES (?,?,?,?);`,
        [fullname, password, email,  role]
        )
        console.log(user)
        res.status(200).json({
            success:true,
            message:"user added",
            data:user
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            message:"user error",
            error: error.message
        })
    }
}


module.exports = {
  getAllUsers,
  addUser
};
