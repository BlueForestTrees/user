import {init, withError, withTest} from "test-api-express-mongo"
import api from "../src/index"
import ENV from "../src/env"
import {cols} from "../src/const/collections"
import {userStatus} from "../src/const/userStatus"

describe('POST Suscription', function () {

    beforeEach(init(api, ENV, cols))

    it('suscription', withTest({
        req: {
            method: "POST",
            url: "/api/user/suscribe",
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
    }))

    it('suscription existing mail', withTest({
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
            url: "/api/user/suscribe",
            body: {
                mail: "smedini@gmail.com"
            }
        },
        res: {
            code: 400,
            body: withError(1,"L'élément existe déjà")
        }
    }))

    it('suscription invalid mail', withTest({
        req: {
            method: "POST",
            url: "/api/user/suscribe",
            body: {
                mail: "smedini@gmail."
            }
        },
        res: {
            code: 400,
            bodypath: {path: "$.errors.mail.msg", value: ["mail invalid"]}
        }
    }))

})