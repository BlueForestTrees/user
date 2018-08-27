import {init, run, withTest} from "test-api-express-mongo"
import {badLoginAuthentSpec, badPasswordAuthentSpec, validAuthentSpec} from "./postAuthentSpec"
import api from "../src/index"
import ENV from "../src/env"
import {cols} from "../src/const/collections"

describe('POST Auth', function () {

    beforeEach(init(api, ENV, cols))

    it('valid authent test', withTest(validAuthentSpec))

    it('bad password authent test', withTest(badPasswordAuthentSpec))

    it('bad login authent test', withTest(badLoginAuthentSpec))

})