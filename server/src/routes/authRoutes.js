const authController = require('../controllers/authController');
const validateRequest = require('../middlewares/validateRequest');
const { signupSchema, loginSchema } = require('../validation/schemas');
const Router = require('express');
const authRouter = Router();

authRouter.post('/signup', validateRequest(signupSchema), authController.signup);
authRouter.post('/login', validateRequest(loginSchema), authController.login);

module.exports = authRouter;