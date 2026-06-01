const AppError = require('../exceptions/AppError');

const handlePrismaError = (err) => {
  // Prisma unique constraint violation (e.g., duplicate username or phone)
  if (err.code === 'P2002') {
    const fields = err.meta?.target || 'field';
    return new AppError(`Duplicate value for ${fields}. Please use another value.`, 400);
  }
  // Prisma record not found
  if (err.code === 'P2025') {
    return new AppError(err.meta?.cause || 'Record not found.', 404);
  }
  // Prisma foreign key constraint violation
  if (err.code === 'P2003') {
    return new AppError('Foreign key constraint failed. Related record not found.', 400);
  }
  return err;
};

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  error.stack = err.stack;

  // Handle Prisma Database Errors
  if (err.code && err.code.startsWith('P')) {
    error = handlePrismaError(err);
  }

  const statusCode = error.statusCode || 500;
  const status = error.status || 'error';

  console.error('ERROR 💥:', {
    message: error.message,
    stack: error.stack,
    code: err.code
  });

  return res.status(statusCode).json({
    status: status,
    message: error.message || 'Something went wrong on the server',
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  });
};

module.exports = errorHandler;
