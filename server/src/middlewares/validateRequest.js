const AppError = require("../exceptions/AppError");

const validateRequest = (schema) => {
  return async (req, res, next) => {
    try {
      // Validate req.body, req.query, and req.params
      const validated = await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      // Assign sanitized, validated outputs back to Express request wrapper
      req.body = validated.body;
      req.query = validated.query;
      req.params = validated.params;

      next();
    } catch (error) {
      if (error.name === 'ZodError') {
        const errorDetails = error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message
        }));

        // Fail early with Zod validation details
        return res.status(400).json({
          status: 'fail',
          message: 'Validation failed',
          errors: errorDetails
        });
      }
      next(error);
    }
  };
};

module.exports = validateRequest;
