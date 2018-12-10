import sha1 from 'sha1'
import jwt from "jsonwebtoken"
import {cols} from "../../src/const/collections"
import {userStatus} from "../../src/const/userStatus"
import {X_ACCESS_TOKEN} from "../../src/const/headers"
import ENV from "../../src/env"

const getRandomColor = () => {
    const letters = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}

const god = {
    status: userStatus.CONFIRMED,
    mail: "god@test.fr",
    fullname: "God Test",
    wantSuscribeDate: new Date(),
    password: sha1("god_password"),
    confirmDate: new Date(),
    color: getRandomColor(),
    rights: "G"
}

export const authGod = {[X_ACCESS_TOKEN]: jwt.sign({user: god}, ENV.JWT_SECRET, {expiresIn: "1d"})}

export const database = {
    [cols.USER]: [god],
}