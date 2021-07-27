import rateLimit from "express-rate-limit";

export const rateLimitMiddleware = rateLimit({
  windowMs: 60 * 1000,
  max: 1,
  message:
    "Too many accounts created from this IP, please try again after a minute",
});
