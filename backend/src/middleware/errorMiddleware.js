const errorMiddleware = (err, req, res, next) => {
  // Log the full error on the server
  console.error("Error:", err);

  const statusCode = err.statusCode || 500;

  // Never expose database/internal error details to the client
  if (statusCode === 500) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }

  return res.status(statusCode).json({
    success: false,
    message: err.message || "Request failed",
  });
};

module.exports = errorMiddleware;