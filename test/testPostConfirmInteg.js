import {init, run, withTest} from "test-api-express-mongo"
import {validConfirmSpec} from "./postConfirmSpec"
import api from "../src/index"
import ENV from "../src/env"
import {cols} from "../src/const/collections"

describe('POST Confirm', function () {

    beforeEach(init(api, ENV, cols))

    it('valid confirm test', withTest(validConfirmSpec))


})