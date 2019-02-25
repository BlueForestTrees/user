import {sendWelcomeMail} from "./rest/authService"
import ENV from "./env"

export default () => new Promise(async (resolve, reject) => {
    const err = []

    if (ENV.NODE_ENV === 'production') {
        try {
            await sendWelcomeMail('slimane.medini@blueforest.org')
        } catch (e) {
            err.push(e)
        }
    }

    if (err.length) {
        reject(err)
    } else {
        resolve(err)
    }
})