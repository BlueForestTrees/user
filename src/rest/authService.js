import ENV from "../env"
import {UnauthorizedError} from "./Errors"
import {findUserByMail, insertNewUser, confirmUser} from "./userService"
import sha1 from 'sha1'
import jwt from "jsonwebtoken"
import {doMail} from "./mailService"
import {templates} from "../const/templates"
import {X_ACCESS_TOKEN} from "../const/headers"

export const startSuscribe = async ({mail}) => {
    await insertNewUser(mail)
    await sendWelcomeMail(mail)
    return null
}

const sendWelcomeMail = mail => doMail({
        to: mail,
        subject: `Confirmer ${mail} pour BlueForest`,
        link: `${ENV.MAIL_CONFIG.confirmLink}${jwt.sign({mail, date: new Date()}, ENV.MAIL_CONFIG.welcomeTokenSecret, {expiresIn: "1d"})}`
    },
    templates.WANT_SUSCRIBE)


export const confirmSuscribe = async ({t, fullname, password}, req, res) => {
    const token = jwt.verify(t, ENV.MAIL_CONFIG.welcomeTokenSecret)
    const mail = token.mail
    await confirmUser({mail, fullname, password})
    return authenticate({mail, password}, req, res)
}

export const authenticate = async function ({mail, password}, req, res) {
    const user = await findUserByMail(mail)
    if (!user) {
        throw new UnauthorizedError()
    } else if (user.password !== sha1(password)) {
        throw new UnauthorizedError()
    } else {
        delete user.password
        const token = jwt.sign({user}, ENV.AUTH_TOKEN_SECRET, {expiresIn: "1d"})
        res.header(X_ACCESS_TOKEN, token)
        return null
    }
}

export const validToken = (req, res, next) => {
    verifyToken(req)
    next()
}

const verifyToken = req => {
    const token = req.headers[X_ACCESS_TOKEN]
    if (token) {
        try {
            return jwt.verify(token, ENV.AUTH_TOKEN_SECRET)
        } catch (e) {
            throw new UnauthorizedError("bad token", e)
        }
    } else {
        throw new UnauthorizedError("missing token")
    }
}

export const validGod = function (req, res, next) {
    const token = verifyToken(req)
    if (!token.user.god) {
        throw {status: 403}
    }
    next()
}