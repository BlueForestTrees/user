import {run} from 'express-blueforest'
import {validPassword, validMail, validWelcomeToken, validFullname} from "../validations"
import {authenticate, confirmSuscribe, startSuscribe} from "./authService"
import {Router} from "express-blueforest"

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