// Middleware that logs every request to the server
export const logger = (req, res, next) => {
    const now = new Date().toISOString();
    console.log(`[${now}] ${req.method} ${req.url}`);
    next();
};

// Middleware that handles every error that occurs with server requests
export const errorHandler = (err, req, res, next) => {
    const statusCode = err.status || 500;
    res.status(statusCode).json({
    message: err.message || 'Internal Server Error',
    });
}