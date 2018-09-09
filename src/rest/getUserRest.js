import {run, convert} from 'express-blueforest'
import {Router} from "express-blueforest"
import {findUserById, findUserByMail} from "./userService"
import {mixin, validId, validMail, validOptionalMixin} from "../validations"

const router = Router()

module.exports = router

router.get('/api/user/:_id',
    validId,
    run(findUserById)
)

router.get('/api/user/mail/:mail',
    validMail,
    validOptionalMixin,
    convert(mixin),
    run(findUserByMail)
)