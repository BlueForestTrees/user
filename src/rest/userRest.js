import {convert, run} from 'express-blueforest'
import {validPassword, validMail, validWelcomeToken, validFullname, validId, validOptionalMixin, mixin, validTerm, validDescription, validUser, validOwner} from "../validations"
import {authenticate, confirmSuscribe, startSuscribe} from "./authService"
import {Router} from "express-blueforest"
import {findUserById, findUserByMail, findUserByTerm, updateUser} from "./userService"
import {check} from 'express-validator/check'
import {col} from "mongo-registry"
import {cols} from "../const/collections"

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
router.get('/api/user/term/:term',
    validTerm,
    run(findUserByTerm)
)

router.get('/api/user/mail/:mail',
    check("mail").isLength({min: 1, max: 500}),
    validOptionalMixin,
    convert(mixin),
    run(findUserByMail)
)

router.put('/api/user',
    validId,
    validDescription.optional(),
    validFullname.optional(),
    validUser,
    validOwner(col(cols.USER), "_id", "_id"),
    run(updateUser)
)

