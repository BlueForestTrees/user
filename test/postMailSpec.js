import {withError} from "test-api-express-mongo"
import {userStatus} from "../src/const/userStatus"
import {cols} from "../src/const/collections"

export const validPostMailSpec = {
    req: {
        method: "POST",
        url: "/api/auth/mail",
        body: {
            mail: "smedini@gmail.com"
        }
    },
    res: {
        body: null
    },
    db: {
        expected: {
            colname: cols.USER,
            doc: {
                mail: "smedini@gmail.com",
                status: userStatus.WANT_SUSCRIBE
            }
        }
    }
}

export const existingPostMailSpec = {
    db: {
        preChange: {
            colname: cols.USER,
            doc: {
                mail: "smedini@gmail.com"
            }
        }
    },
    req: {
        method: "POST",
        url: "/api/auth/mail",
        body: {
            mail: "smedini@gmail.com"
        }
    },
    res: {
        code: 400,
        body: withError(1,"allready exists")
    }
}

export const invalidPostMailSpec = {
    req: {
        method: "POST",
        url: "/api/auth/mail",
        body: {
            mail: "smedini@gmail."
        }
    },
    res: {
        code: 400,
        bodypath: {path: "$.errors.mail.msg", value: ["mail invalid"]}
    }
}