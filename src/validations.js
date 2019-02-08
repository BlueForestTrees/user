import {check, header} from 'express-validator/check'
import {objectNoEx} from "mongo-registry"

const mongoId = chain => chain.exists().withMessage("missing").isMongoId().withMessage("invalid mongo id").customSanitizer(objectNoEx)
export const validMongoId = field => mongoId(check(field))


export const validId = validMongoId("_id")
export const validTerm = check('term').isLength({min: 1, max: 100}).matches(/^.+/)
export const validFullname = check('fullname').isLength({min: 1, max: 100}).matches(/^.+/)
export const validMail = check("mail").isEmail().normalizeEmail().withMessage('mail invalid')
export const validWelcomeToken = check('t').exists()
export const validPassword = check('password').isLength({min: 1, max: 100}).matches(/^.+/)

export const validOptionalMixin = header("mixin").optional().exists()
export const mixin = o => {
    if (o.mixin) {
        const arr = o.mixin.split("|")
        const mixin = {}
        for (let i = 0; i < arr.length; i++) {
            mixin[arr[i]] = 1
        }
        o.mixin = mixin
    }
    return o
}