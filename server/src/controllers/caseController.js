const caseService = require("../services/caseService");

exports.createCase = async (req, res, next) => {
    try {
        const newCase = await caseService.createCase(req.body);
        return res.status(201).json({
            message: "Case created successfully",
            data: newCase
        });
    } catch (error) {
        next(error);
    }
};

exports.countCaseStatus = async (req, res, next) => {
    try {
        const query = await caseService.countCaseStatus();
        return res.status(200).json({
            message: "List of cases retrieved successfully",
            data: query
        });
    } catch (error) {
        next(error);
    }
};

exports.caseInfo = async (req, res, next) => {
    try {
        const query = await caseService.caseInfo(req.user.id);
        return res.status(200).json({
            message: "List of cases",
            data: query
        });
    } catch (error) {
        next(error);
    }
};

exports.caseUserInfo = async (req, res, next) => {
    try {
        const userId = parseInt(req.user.id, 10);
        const query = await caseService.caseUserInfo(userId);
        return res.status(200).json({
            message: "List of cases",
            data: query
        });
    } catch (error) {
        next(error);
    }
};

exports.caseList = async (req, res, next) => {
    try {
        const query = await caseService.caseList();
        return res.status(200).json({
            message: "List of cases",
            data: query
        });
    } catch (error) {
        next(error);
    }
};

exports.caseById = async (req, res, next) => {
    try {
        const caseId = parseInt(req.params.id, 10);
        const caseData = await caseService.caseById(caseId);
        return res.status(200).json({ data: caseData });
    } catch (error) {
        next(error);
    }
};

exports.updateCase = async (req, res, next) => {
    try {
        const caseId = parseInt(req.params.id, 10);
        const updatedCase = await caseService.updateCase(caseId, req.body);
        return res.status(200).json({
            message: "Case updated successfully",
            data: updatedCase
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteCase = async (req, res, next) => {
    try {
        const caseId = parseInt(req.params.id, 10);
        await caseService.deleteCase(caseId);
        return res.status(200).json({ message: "Case deleted successfully" });
    } catch (error) {
        next(error);
    }
};
