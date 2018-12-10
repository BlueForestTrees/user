import {cols} from "./const/collections"
import {version, name} from './../package.json'
import path from 'path'
import fs from 'fs'

const debug = require('debug')('api:auth')


const ENV = {
    NAME: name,
    PORT: process.env.PORT || 80,

    REST_PATH: process.env.REST_PATH || "rest",

    DB_CONNECTION_STRING: process.env.DB_CONNECTION_STRING,
    DB_NAME: process.env.DB_NAME || "BlueForestTreesDB",
    DB_HOST: process.env.DB_HOST || "localhost",
    DB_PORT: process.env.DB_PORT || 27017,
    DB_USER: process.env.DB_USER || "doudou",
    DB_PWD: process.env.DB_PWD || "masta",
    DB_COLLECTION: process.env.DB_COLLECTION || cols.USER,

    JWT_SECRET: process.env.JWT_SECRET || 'fqse6}@@@#{tc\'uauauaua_f\'}_^@{}@_{{}#~@26nt8/z(_ic;ç(_q206az\'\"tct;çp_²²\\\\\\\"',


    NODE_ENV: process.env.NODE_ENV || null,
    VERSION: version,
    MORGAN: process.env.MORGAN || ':status :method :url :response-time ms - :res[content-length]',

    MAIL_TEMPLATE_PATH: process.env.MAIL_TEMPLATE_PATH || path.resolve("/etc/user/templates"),
    MAIL_CONFIG: {
        "from": process.env.MAIL_FROM || "mailFrom",
        "welcomeTokenSecret": process.env.MAIL_SECRET || "secret",
        "confirmLink": "http://" + (process.env.MAIL_CALLBACK_HOST_PORT || "localhost:8079") + "/confirm/",
        "options": {
            "host": process.env.MAIL_HOST,
            "port": process.env.MAIL_PORT,
            "secure": true,
            "auth": {
                "user": process.env.MAIL_USER,
                "pass": process.env.MAIL_PWD
            }
        }
    }
}

debug("ENV", JSON.stringify(ENV))

export default ENV