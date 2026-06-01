const questionService = require("../services/questionService");

exports.createQuestion = async (req, res, next) => {
    try {
        const newQuestion = await questionService.createQuestion(req.body);
        return res.status(201).json({
            message: "Question created",
            data: newQuestion
        });
    } catch (error) {
        next(error);
    }
};

exports.listQuestion = async (req, res, next) => {
    try {
        const { query, count } = await questionService.listQuestion();
        return res.status(200).json({
            data: query,
            count: count
        });
    } catch (error) {
        next(error);
    }
};

exports.questionById = async (req, res, next) => {
    try {
        const questionId = parseInt(req.params.id, 10);
        const question = await questionService.questionById(questionId);
        return res.status(200).json({ data: question });
    } catch (error) {
        next(error);
    }
};

exports.updateQuestion = async (req, res, next) => {
    try {
        const questionId = parseInt(req.params.id, 10);
        const updatedQuestion = await questionService.updateQuestion(questionId, req.body);
        return res.status(200).json({
            message: "Question updated",
            data: updatedQuestion
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteQuestion = async (req, res, next) => {
    try {
        const questionId = parseInt(req.params.id, 10);
        await questionService.deleteQuestion(questionId);
        return res.status(200).json({
            message: "Question deleted"
        });
    } catch (error) {
        next(error);
    }
};
