import { rateLimit } from 'express-rate-limit'

const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 10, // Limit each IP to 10 requests per windowMs
    standardHeaders: 'draft-8', // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: 'Too many requests from this IP, please try again later.'
})

const rateLimitMiddleware = (req, res, next) => {
    return limiter(req, res, next)
}

export default rateLimitMiddleware