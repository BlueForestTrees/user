import {expect} from 'chai'

import {genMail, sendMail} from "../src/rest/mailService"

describe('TU mail', function () {

    it('generate', function () {
        const mail = genMail({link: "blue.org/ds1f984"}, "testTemplate.html")
        expect(mail).to.equal("salut blue.org/ds1f984")
    })

    it('send big', function (done) {
        sendMail("smedini@gmail.com", "subject", "html")
            .then(() => done())
            .catch((e) => {
                throw e
            })
    })
})