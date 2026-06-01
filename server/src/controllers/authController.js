const authService = require("../services/authService");

exports.signup = async (req, res, next) => {
    try {
        const newUser = await authService.signup(req.body);
        res.status(201).json({
            message: "User registered successfully!",
            data: newUser,
        });
    } catch (error) {
        next(error);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const result = await authService.login(username, password);
        res.status(200).json({
            message: "Login success",
            data: result
        });
    } catch (error) {
        next(error);
    }
};

exports.initializeAdminUser = async () => {
    await authService.initializeAdminUser();
};
