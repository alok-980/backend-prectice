import { body, validationResult } from 'express-validator';

export const registerValidation = [
    body('email')
        .exists().withMessage("email is required").bail()
        .trim()
        .isEmail().withMessage("Enter valid email address"),

    body('name')
        .exists().withMessage("Name is required").bail()
        .isString().withMessage("Name must be a string")
        .trim()
        .isLength({ min: 2, max: 50 }).withMessage("Name must be between 2 to 50 characters"),

    body('password')
        .exists().withMessage("Password is required").bail()
        .isString().withMessage("Password mut be a string")
        .trim()
        .isLength({ min: 6 }).withMessage("Password mut be minimum 6 character long"),

    (req, res, next) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: "Invalid Request",
                errors: errors.array()
            })
        }

        next();
    }

]

export const loginValidation = [
    body("email")
        .exists().withMessage("Email is Required").bail()
        .isString().withMessage("Email must be a String Value").bail()
        .trim()
        .isEmail().withMessage("Enter a valid email address"),
    body("password")
        .exists().withMessage("Password is required").bail()
        .isString().withMessage("Password must be a String value").bail()
        .trim()
        .isLength({ min: 6 }).withMessage("Password at least 6 character long"),
    (req, res, next) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: "Invalid data",
                errors: errors.array()
            })
        }

        next()

    }
]