import {init, run, withTest} from "test-api-express-mongo"
import api from "../src/index"
import ENV from "../src/env"
import {cols} from "../src/const/collections"
import {createObjectId} from "mongo-registry"

describe('GET user', function () {

    beforeEach(init(api, ENV, cols))

    const userId = createObjectId()

    it('GET user by id', withTest({
        db: {
            preChange: {
                colname: cols.USER,
                doc: {
                    _id: userId,
                    field1: "toto",
                    field2: 42
                }
            }
        },
        req: {
            url: `/api/user/${userId.toString()}`
        },
        res: {
            body: {
                _id: userId,
                field1: "toto",
                field2: 42
            }
        }
    }))


})