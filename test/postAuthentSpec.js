import {cols} from "..//src/const/collections"
import sha1 from "sha1"
import {X_ACCESS_TOKEN} from "../src/const/headers"

export const validAuthentSpec = {
    db: {
        preChange: {
            colname: cols.USER,
            doc: {
                mail: "toto@titi.tu",
                password: sha1("verySecretPasswordLoginTest")
            }
        }
    },
    req: {
        method: "POST",
        url: "/api/auth",
        body: {
            mail: "toto@titi.tu",
            password: "verySecretPasswordLoginTest"
        }
    },
    res: {
        headers: [{key: X_ACCESS_TOKEN}],
        body: null
    }
}

export const badPasswordAuthentSpec = {
    db: {
        preChange: {
            colname: cols.USER,
            doc: {
                mail: "toto@titi.tu",
                password: sha1("verySecretPasswordLoginTest")
            }
        }
    },
    req: {
        method: "POST",
        url: "/api/auth",
        body: {
            mail: "toto@titi.tu",
            password: "BAD_PASSWORD"
        }
    },
    res: {
        code: 401,
        body: null
    }
}
export const badLoginAuthentSpec = {
    db: {
        preChange: {
            colname: cols.USER,
            doc: {
                mail: "toto@titi.tu",
                password: sha1("verySecretPasswordLoginTest")
            }
        }
    },
    req: {
        method: "POST",
        url: "/api/auth",
        body: {
            mail: "bad@mail.com",
            password: "verySecretPasswordLoginTest"
        }
    },
    res: {
        code: 401,
        body: null
    }
}