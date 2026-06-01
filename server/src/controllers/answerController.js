const answerService = require("../services/answerService");

exports.createAnswer = async (req, res, next) => {
    try {
        const insertResult = await answerService.createAnswer(req.body);
        return res.status(201).json({
            message: "Answers created successfully",
            data: insertResult
        });
    } catch (error) {
        next(error);
    }
};

exports.listAnswer = async (req, res, next) => {
    try {
        const query = await answerService.listAnswer();
        return res.status(200).json({
            data: query
        });
    } catch (error) {
        next(error);
    }
};

exports.answerById = async (req, res, next) => {
    try {
        const answerId = parseInt(req.params.id, 10);
        const answer = await answerService.answerById(answerId);
        return res.status(200).json({
            data: answer
        });
    } catch (error) {
        next(error);
    }
};

exports.searchAnswer = async (req, res, next) => {
    try {
        const { questionId } = req.query;
        const answers = await answerService.searchAnswer(questionId);
        return res.status(200).json({
            data: answers
        });
    } catch (error) {
        next(error);
    }
};

exports.updateAnswer = async (req, res, next) => {
    try {
        const answerId = parseInt(req.params.id, 10);
        const updatedAnswer = await answerService.updateAnswer(answerId, req.body);
        return res.status(200).json({
            message: "Answer updated successfully",
            data: updatedAnswer
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteAnswer = async (req, res, next) => {
    try {
        const answerId = parseInt(req.params.id, 10);
        await answerService.deleteAnswer(answerId);
        return res.status(200).json({
            message: "Answer deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};