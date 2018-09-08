import {col} from "mongo-registry"
import sha1 from 'sha1'
import {userStatus} from "../const/userStatus"
import {cols} from "../const/collections"

const users = () => col(cols.USER)

export const findUserByMail = mail => users().findOne({mail})

export const findUserById = ({_id}) => users().findOne({_id})

export const insertNewUser = mail => users().insertOne({status: userStatus.WANT_SUSCRIBE, mail, wantSuscribeDate: new Date()})

export const confirmUser = ({mail, fullname, password}) => users().update({mail}, {
    $set: {
        status: userStatus.CONFIRMED,
        fullname,
        password: sha1(password),
        confirmDate: new Date(),
        color: getRandomColor()
    }
})

const getRandomColor = () => {
    const letters = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}