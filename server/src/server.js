const express = require('express')
const { PORT } = require('./../constants')
const rootRouter = require('./routes')
const cors = require('cors')
const { initializeAdminUser } = require('./controllers/authController')
const bodyParser = require('body-parser')
const errorHandler = require('./middlewares/errorHandler')
const helmet = require('helmet')
const { rateLimit } = require('express-rate-limit')

const app = express()

// Enable Helmet security headers
app.use(helmet())

app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))

// Define rate-limiter middleware (100 requests per 15 minutes)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    message: {
        status: 'fail',
        message: 'Too many requests from this IP, please try again after 15 minutes.'
      },
    standardHeaders: true,
    legacyHeaders: false,
})

// Apply rate limiter to all API endpoints
app.use('/api', limiter)

app.use((error, req, res, next) => {
    if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
        return res.status(400).json({ error: 'Invalid JSON format' });
    }
    next();
});

app.use('/api', rootRouter)

// Global Error Handler Middleware
app.use(errorHandler)

initializeAdminUser()

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})