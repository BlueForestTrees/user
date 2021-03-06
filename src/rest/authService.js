import ENV from "../env"
import {findUserByMail, insertNewUser, confirmUser} from "./userService"
import sha1 from 'sha1'
import jwt from "jsonwebtoken"
import {doMail} from "./mailService"
import {templates} from "../const/templates"
import {X_ACCESS_TOKEN} from "../const/headers"

export const startSuscribe = async ({mail}) => {
    const existing = await findUserByMail({mail})
    if (!existing) {
        await insertNewUser(mail)
    }
    await sendWelcomeMail(mail)
    return null
}

export const sendWelcomeMail = mail => doMail({
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
    const user = await findUserByMail({mail})
    if (!user) {
        throw {code: "bf403-login"}
    } else if (user.password !== sha1(password)) {
        throw {code: "bf403-login"}
    } else {
        delete user.password
        const token = jwt.sign({user}, ENV.JWT_SECRET, {expiresIn: "20d"})
        res.header(X_ACCESS_TOKEN, token)
        return null
    }
}