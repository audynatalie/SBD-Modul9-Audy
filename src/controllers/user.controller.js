const userRepository = require("../repositories/user.repository");
const baseResponse = require("../utils/baseResponse.util");

const bcrypt = require('bcrypt');
const saltrounds = 10;

//Regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]*$/;

exports.createUser = async (req, res) => {
  
    const { name, email, password } = req.query;
    if (!name || !email || !password) {
        return baseResponse(res, false, 400, "Name, email, and password are required", null); 
    }
   
    if (!emailRegex.test(email)) {
        return baseResponse(res, false, 400, "format email tidak valid", null);
    }

    if (!passwordRegex.test(password)) {
        return baseResponse(res, false, 400, "Password must contain at least one number", null);
    }
  
    try {
        const existingUser = await userRepository.getUserByEmail(email);
       
        if (existingUser) {
            return baseResponse(res, false, 400, "Email already used", null);
        }
     
        const hashedPassword = await bcrypt.hash(password, saltrounds);
        const user = await userRepository.createUser({ name, email, password: hashedPassword });
        return baseResponse(res, true, 201, "User created", user);
  
    } catch (error) {
        return baseResponse(res, false, 500, "Error creating user", error);
    }
};

exports.login = async (req, res) => {
  
    const { email, password } = req.query;
    if (!email || !password) {
        return baseResponse(res, false, 400, "Email and password are required", null);
    }
   
    try {
        const user = await userRepository.getUserByEmail(email);
        if (!user) {
            return baseResponse(res, false, 400, "Invalid email or password", null);
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
       
        if (!isPasswordValid) {
            return baseResponse(res, false, 400, "Invalid email or password", null);
        }
        return baseResponse(res, true, 200, "Login success", user);
 
    } catch (error) {
        return baseResponse(res, false, 500, "Error logging in", error);
    }
};


exports.getUserByEmail = async (req, res) => {
    
    try {
        const user = await userRepository.getUserByEmail(req.params.email);
        if (!user) {
            return baseResponse(res, false, 404, "User not found", null);
        }
        return baseResponse(res, true, 200, "User found", user);
 
    } catch (error) {
        return baseResponse(res, false, 500, "Error retrieving user", error);
    }
};


exports.getAllUsers = async (req, res) => {

    try {
        const users = await userRepository.getAllUsers();
        return baseResponse(res, true, 200, "Users retrieved", users);
    }
  
    catch (error) {
        return baseResponse(res, false, 500, "Error retrieving users", error);
    }
};



exports.updateUser = async (req, res) => {
   
    const { id, name, email, password } = req.body;
    if (!id || !name || !email || !password) {
        return baseResponse(res, false, 400, "ID, name, email, and password are required", null);
    }
  
    if (!emailRegex.test(email)) {
        return baseResponse(res, false, 400, "Invalid email format", null);
    }

    if (!passwordRegex.test(password)) {
        return baseResponse(res, false, 400, "Password must contain at least one number", null);
    }
  
    try {
        const hashedPassword = await bcrypt.hash(password, saltrounds);
        const user = await userRepository.updateUser({ id, name, email, password: hashedPassword });
        if (!user) {
            return baseResponse(res, false, 404, "User not found", null);
        }
        return baseResponse(res, true, 200, "User updated", user);
  
    } catch (error) {
        return baseResponse(res, false, 500, "Error updating user", error);
    }
};

exports.deleteUser = async (req, res) => {
   
    try {
        const user = await userRepository.deleteUser(req.params.id);
        if (!user) {
            return baseResponse(res, false, 404, "User not found", null);
        }
        return baseResponse(res, true, 200, "User deleted", user);
  
    } catch (error) {
        return baseResponse(res, false, 500, "Error deleting user", error);
    }
};

exports.userTopUp = async (req, res) => {
   
    const { id, amount } = req.query;
    if (!id || !amount) {
        return baseResponse(res, false, 400, "Amount must be larger than 0", null);
    }
 
    try {
        const user = await userRepository.userTopUp(id, amount);
        if (!user) {
            return baseResponse(res, false, 404, "User not found", null);
        }
        return baseResponse(res, true, 200, "Top Up Successfully", user);
   
    } catch (error) {
        return baseResponse(res, false, 500, " ", error);
    }
};
