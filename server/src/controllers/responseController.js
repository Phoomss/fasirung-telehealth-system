const responseService = require("../services/responseService");

// Kept spelling as createRespone to prevent breaking routes mapping
exports.createRespone = async (req, res, next) => {
    try {
        const responseData = await responseService.createResponse(req.body);
        return res.status(201).json({
            message: "Responses created successfully",
            data: responseData
        });
    } catch (error) {
        next(error);
    }
};

exports.listResponse = async (req, res, next) => {
    try {
        const responseArray = await responseService.listResponse();
        return res.status(200).json({
            message: "List of responses grouped by user",
            data: responseArray
        });
    } catch (error) {
        next(error);
    }
};

exports.responseByUserId = async (req, res, next) => {
    try {
        const userId = parseInt(req.params.id, 10);
        const responses = await responseService.responseByUserId(userId);
        return res.status(200).json({
            message: "List of responses for the user",
            data: responses
        });
    } catch (error) {
        next(error);
    }
};

exports.updateResponse = async (req, res, next) => {
    try {
        const responseId = parseInt(req.params.id, 10);
        const updatedResponse = await responseService.updateResponse(responseId, req.body);
        return res.status(200).json({
            message: "Response updated successfully",
            data: updatedResponse
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteResponse = async (req, res, next) => {
    try {
        const responseId = parseInt(req.params.id, 10);
        const deletedResponse = await responseService.deleteResponse(responseId);
        return res.status(200).json({
            message: "Response deleted successfully",
            data: deletedResponse
        });
    } catch (error) {
        next(error);
    }
};