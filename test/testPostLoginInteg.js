import {init, run, withTest} from "test-api-express-mongo"
import api from "../src/index"
import ENV from "../src/env"
import {cols} from "../src/const/collections"
import sha1 from "sha1"
import {X_ACCESS_TOKEN} from "../src/const/headers"

describe('POST Auth', function () {

    beforeEach(init(api, ENV, cols))

    it('valid authent test', withTest({
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
            url: "/api/user/login",
            body: {
                mail: "toto@titi.tu",
                password: "verySecretPasswordLoginTest"
            }
        },
        res: {
            headers: [{key: X_ACCESS_TOKEN}],
            body: null
        }
    }))

    it('bad password authent test', withTest({
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
            url: "/api/user/login",
            body: {
                mail: "toto@titi.tu",
                password: "BAD_PASSWORD"
            }
        },
        res: {
            code: 403,
            body: null
        }
    }))

    it('bad login authent test', withTest({
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
            url: "/api/user/login",
            body: {
                mail: "bad@mail.com",
                password: "verySecretPasswordLoginTest"
            }
        },
        res: {
            code: 403,
            body: null
        }
    }))

})