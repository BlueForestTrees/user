import {col} from "mongo-registry"
import sha1 from "sha1"
import {cols} from "./const/collections"
import {userStatus} from "./const/userStatus"

export const registry = [
    {
        version: "0.0.1",
        log: "User.mail: index unique",
        script: () => col(cols.USER).createIndex({"mail": 1}, {unique: true})
    },
    {
        version: "0.0.1",
        log: "User admin",
        script: () => col(cols.USER).insertOne({
            status: userStatus.CONFIRMED,
            mail: "admin@bf.org",
            fullname: "Admin BlueForest",
            wantSuscribeDate: new Date(),
            confirmDate: new Date(),
            password: sha1("tirlititi"),
            color: "#1565c0",
            god: true
        })
    },
    {
        version: "0.0.1",
        log: "User non admin",
        script: () => col(cols.USER).insertOne({
            status: userStatus.CONFIRMED,
            mail: "user@bf.org",
            fullname: "User BlueForest",
            wantSuscribeDate: new Date(),
            confirmDate: new Date(),
            password: sha1("tirlititi"),
            color: "#1565c0"
        })
    },
    {
        version: "1.0.1",
        log: "User ADEME",
        script: () => col(cols.USER).insertOne({
            shortname: "ADEME",
            fullname: "Agence de l'environnement et de la maîtrise de l'énergie",
            color: "#c62828",
            mail: "ademe@ademe.fr"
        })
    }
]