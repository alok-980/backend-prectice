import { body, validationResult } from 'express-validator';

export const productCreateValidator = [
    body("title")
        .exists().withMessage("Title is required").bail()
        .isString().withMessage("Title must be a string").bail()
        .trim()
        .isLength({ min: 2, max: 100 }).withMessage("Title length must be between 2 to 100 characters").bail()
        .isAlpha("en-US", { ignore: " " }).withMessage("Title can only have english small case and capital case character"),

    body("description")
        .exists().withMessage("Description is required").bail()
        .isString().withMessage("Description must be a string").bail()
        .trim()
        .isLength({ min: 20, max: 500 }).withMessage("Description length must be between 20 to 500 characters"),

    body("price.amount")
        .exists().withMessage("Amount is required").bail()
        .isFloat({ min: 0 }).withMessage("Price amount must be a floating number greater than or equal to 0"),

    body("price.currency")
        .optional()
        .isString().withMessage("Currency must be a string").bail()
        .isIn(["INR", "USD"]).withMessage("Currency must be either INR or USD"),

    body("sizes")
        .optional()
        .isArray().withMessage("Sizes must be an array"),

    body("sizes.*.size")
        .exists().withMessage("Size is required").bail()
        .isString().withMessage("Size must be a string").bail()
        .isIn(["XS", "S", "M", "L", "XL", "XXL"]).withMessage("Allowed sizes - XS, S, M, L, XL, XXL"),

    body("sizes.*.stock")
        .optional()
        .isInt({ min: 0 }).withMessage("Stock must be a non-negative integer"),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: "Invalid data",
                errors: errors.array()
            });
        }
        next();
    }
];