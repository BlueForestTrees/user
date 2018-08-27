import {cols} from "./const/collections"
import {version, name} from './../package.json'
import path from 'path'
import fs from 'fs'
const debug = require('debug')('api:auth')


const ENV = {
    NAME:name,
    PORT: process.env.PORT || 8080,
    
    REST_PATH: process.env.REST_PATH || "rest",
    
    DB_NAME: process.env.DB_NAME || "BlueForestTreesDB",
    DB_HOST: process.env.DB_HOST || "localhost",
    DB_PORT: process.env.DB_PORT || 27017,
    DB_USER: process.env.DB_USER || "doudou",
    DB_PWD: process.env.DB_PWD || "masta",
    DB_COLLECTION: process.env.DB_COLLECTION || cols.USER,

    AUTH_TOKEN_SECRET: process.env.AUTH_TOKEN_SECRET || 'fqse6}@@@#{tc\'uauauaua_f\'}_^@{}@_{{}#~@26nt8/z(_ic;ç(_q206az\'\"tct;çp_²²\\\\\\\"',


    NODE_ENV: process.env.NODE_ENV || null,
    VERSION: version,
    MORGAN: process.env.MORGAN || ':status :method :url :response-time ms - :res[content-length]',


    MAIL_CONFIG_PATH: process.env.MAIL_CONFIG_PATH ? path.resolve(process.env.MAIL_CONFIG_PATH, "mailConfig.json") : path.resolve("/etc/api-auth/mailConfig.json"),
    MAIL_TEMPLATE_PATH: process.env.MAIL_TEMPLATE_PATH || path.resolve("/etc/api-auth/templates")
}

try {
    ENV.MAIL_CONFIG = JSON.parse(fs.readFileSync(ENV.MAIL_CONFIG_PATH, 'utf8'))
} catch (e) {
    if (ENV.NODE_ENV === "production") {
        throw e
    } else {
        debug("Erreur à la lecture de la config de mail dans %o", ENV.MAIL_CONFIG_PATH, e.message)
    }
}

debug("ENV", JSON.stringify(ENV))

export default ENV