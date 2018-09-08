import {run} from 'express-blueforest'
import {Router} from "express-blueforest"
import {findUserById} from "./userService"
import {validId} from "../validations"

const router = Router()

module.exports = router

router.get('/api/auth/user/:_id',
    validId,
    run(findUserById)
)