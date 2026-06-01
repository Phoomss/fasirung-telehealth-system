const contentService = require("../services/contentService");

exports.createContent = async (req, res, next) => {
    try {
        const newContent = await contentService.createContent(req.body);
        return res.status(201).json({
            message: "Content created successfully",
            data: newContent
        });
    } catch (error) {
        next(error);
    }
};

exports.listContent = async (req, res, next) => {
    try {
        const { query, count } = await contentService.listContent();
        return res.status(200).json({
            message: `List of content: ${count} items`,
            data: query
        });
    } catch (error) {
        next(error);
    }
};

exports.contentById = async (req, res, next) => {
    try {
        const contentId = parseInt(req.params.id, 10);
        const content = await contentService.contentById(contentId);
        return res.status(200).json({ data: content });
    } catch (error) {
        next(error);
    }
};

exports.contentUpdate = async (req, res, next) => {
    try {
        const contentId = parseInt(req.params.id, 10);
        const contentUpdate = await contentService.contentUpdate(contentId, req.body);
        return res.status(200).json({
            message: "Content updated successfully",
            data: contentUpdate
        });
    } catch (error) {
        next(error);
    }
};

exports.contentDelete = async (req, res, next) => {
    try {
        const contentId = parseInt(req.params.id, 10);
        await contentService.contentDelete(contentId);
        return res.status(200).json({
            message: "Content deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};
