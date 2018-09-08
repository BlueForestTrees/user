import {check} from 'express-validator/check'
import {objectNoEx} from "mongo-registry"

const mongoId = chain => chain.exists().withMessage("missing").isMongoId().withMessage("invalid mongo id").customSanitizer(objectNoEx)
export const validMongoId = field => mongoId(check(field))


export const validId = validMongoId("_id")
export const validFullname = check('fullname').isLength({min: 1, max: 100}).matches(/^.+/)
export const validMail = check("mail").isEmail().normalizeEmail().withMessage('mail invalid')
export const validWelcomeToken = check('t').exists()
export const validPassword = check('password').isLength({min: 1, max: 100}).matches(/^.+/)