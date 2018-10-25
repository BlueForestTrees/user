import fs from 'fs'
import handlebars from 'handlebars'
import ENV from "../env"
import path from 'path'
import nodemailer from 'nodemailer'
const debug = require('debug')('api:express:mail')
const error = require('debug')('api:express:mail:err')

const transporter = nodemailer.createTransport(ENV.MAIL_CONFIG.options)

export const doMail = (context, templateFile) => sendMail(context.to, context.subject, genMail(context, templateFile))

export const genMail = (context, templateFile) => {
    const templatePath = path.join(ENV.MAIL_TEMPLATE_PATH, templateFile)
    debug("Lecture template depuis %o...", templatePath)
    const source = fs.readFileSync(templatePath, 'utf8')
    const template = handlebars.compile(source)
    return template(context)
}

export const sendMail = async (to, subject, html) => await new Promise(function (resolve, reject) {
    transporter.sendMail({
        to, subject, text: html, html, from: ENV.MAIL_CONFIG.from
    }, function (err, info) {
        if (err) {
            error(err)
            reject(err)
        } else {
            debug('Email sent: %o', info.response)
            resolve(null)
        }
    })
})
