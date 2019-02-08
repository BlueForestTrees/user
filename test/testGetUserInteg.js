import {init, run, withTest} from "test-api-express-mongo"
import api from "../src/index"
import ENV from "../src/env"
import {cols} from "../src/const/collections"
import {createObjectId} from "mongo-registry"

describe('GET user', function () {

    beforeEach(init(api, ENV, cols))

    const userId = createObjectId()

    const user = {
        "_id": userId,
        "shortname": "Off",
        "fullname": "Open Food Fact",
        "color": "#c69f25",
        "mail": "fr.openfoodfacts.org",
        "site": "https://fr.openfoodfacts.org"
    }

    it('GET user by id', withTest({
        db: {
            preChange: {
                colname: cols.USER,
                doc: user
            }
        },
        req: {
            url: `/api/user/${userId.toString()}`
        },
        res: {
            body: user
        }
    }))

    it('GET user by term', withTest({
        db: {
            preChange: {
                colname: cols.USER,
                doc: user
            }
        },
        req: {
            url: `/api/user/term/Food`
        },
        res: {
            body: [user]
        }
    }))


})