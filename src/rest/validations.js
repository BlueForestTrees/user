import {check} from 'express-validator/check'

export const validFullname = check('fullname').isLength({min: 1, max: 100}).matches(/^.+/)
export const validMail = check("mail").isEmail().normalizeEmail().withMessage('mail invalid')
export const validWelcomeToken = check('t').exists()
export const validPassword = check('password').isLength({min: 1, max: 100}).matches(/^.+/)