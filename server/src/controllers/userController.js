const userService = require("../services/userService");

exports.userInfo = async (req, res, next) => {
    try {
        const result = await userService.userInfo(req.user);
        res.status(200).json({ message: "User info retrieved successfully", data: result });
    } catch (error) {
        next(error);
    }
};

exports.editProfile = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const updatedUser = await userService.editProfile(userId, req.body);
        res.status(200).json({
            message: "Profile updated successfully!",
            data: updatedUser,
        });
    } catch (error) {
        next(error);
    }
};

exports.userList = async (req, res, next) => {
    try {
        const query = await userService.userList();
        res.status(200).json({ message: "User list retrieved successfully", data: query });
    } catch (error) {
        next(error);
    }
};

exports.userById = async (req, res, next) => {
    try {
        const userId = parseInt(req.params.id, 10);
        const query = await userService.userById(userId);
        res.status(200).json({ message: "User list retrieved successfully", data: query });
    } catch (error) {
        next(error);
    }
};

exports.searchUser = async (req, res, next) => {
    try {
        const { role } = req.query;
        const query = await userService.searchUser(role);
        res.status(200).json({ message: "User search retrieved successfully", data: query });
    } catch (error) {
        next(error);
    }
};

exports.updateUser = async (req, res, next) => {
    try {
        const userId = parseInt(req.params.id, 10);
        const updatedUser = await userService.updateUser(userId, req.body);
        res.status(200).json({
            message: "User updated successfully!",
            data: updatedUser,
        });
    } catch (error) {
        next(error);
    }
};

exports.countUser = async (req, res, next) => {
    try {
        const { groups, totalUsers } = await userService.countUser();
        return res.status(200).json({
            message: "List of user retrieved successfully",
            data: groups,
            totalUsers: totalUsers
        });
    } catch (error) {
        next(error);
    }
};