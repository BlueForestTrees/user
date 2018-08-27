import {init, withTest} from "test-api-express-mongo"
import {existingPostMailSpec, invalidPostMailSpec, validPostMailSpec} from "./postMailSpec"
import api from "../src/index"
import ENV from "../src/env"
import {cols} from "../src/const/collections"

describe('POST Mail', function () {

    beforeEach(init(api, ENV, cols))

    it('valid mail test big', withTest(validPostMailSpec))

    it('existing mail test', withTest(existingPostMailSpec))

    it('invalid mail test', withTest(invalidPostMailSpec))

})