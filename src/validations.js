import {check, header} from 'express-validator/check'
import {objectNoEx, object} from "mongo-registry"
import jwt from "jsonwebtoken"
import {run} from 'express-blueforest'

const mongoId = chain => chain.exists().withMessage("missing").isMongoId().withMessage("invalid mongo id").customSanitizer(objectNoEx)
export const validMongoId = field => mongoId(check(field))
export const X_ACCESS_TOKEN = "x-access-token"

export const validId = validMongoId("_id")
export const validTerm = check('term').isLength({min: 1, max: 100}).matches(/^.+/)
export const validFullname = check('fullname').isLength({min: 1, max: 100}).matches(/^.+/)
export const validMail = check("mail").isEmail().normalizeEmail().withMessage('mail invalid')
export const validWelcomeToken = check('t').exists()
export const validPassword = check('password').isLength({min: 1, max: 100}).matches(/^.+/)
export const validDescription = check('description').isLength({min: 0, max: 300}).matches(/^.+/)

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


export const validUser = run((o, req) => {
    let token = jwt.decode(req.headers[X_ACCESS_TOKEN])
    if (!token || !token.user) {
        throw {code: "bf401"}
    }
    req.user = token.user
    req.user._id = object(req.user._id)
    return o
})
export const validOwner = (col, requestField = "_id", ownerField = "oid") => run(async (o, req) => {
    const doc = await col.findOne({_id: o[requestField]})
    if (doc) {
        if (req.user._id.equals(doc[ownerField])) {
            return o
        } else {
            throwErr("invalid owner", "bf403")
        }
    } else {
        throwErr("doc not found", "bf404")
    }
})

const throwErr = (name, code) => {
    const e = new Error(name)
    e.code = code
    throw e
}