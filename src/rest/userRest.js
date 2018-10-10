import {convert, run} from 'express-blueforest'
import {validPassword, validMail, validWelcomeToken, validFullname, validId, validOptionalMixin, mixin} from "../validations"
import {authenticate, confirmSuscribe, startSuscribe} from "./authService"
import {Router} from "express-blueforest"
import {findUserById, findUserByMail} from "./userService"
import {check} from 'express-validator/check'

const router = Router()

module.exports = router

router.post('/api/user/suscribe',
    validMail,
    run(startSuscribe)
)

router.post('/api/user/confirm',
    validWelcomeToken,
    validFullname,
    validPassword,
    run(confirmSuscribe)
)

router.post('/api/user/login',
    validMail,
    validPassword,
    run(authenticate)
)

router.get('/api/user/:_id',
    validId,
    run(findUserById)
)

router.get('/api/user/mail/:mail',
    check("mail").isLength({min: 1, max: 500}),
    validOptionalMixin,
    convert(mixin),
    run(findUserByMail)
)