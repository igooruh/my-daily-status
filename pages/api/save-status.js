import admin from 'firebase-admin'

import { db } from '../../lib/db'
import auth0 from '../../lib/auth0'
import { setStatus } from '../../model/markers'

export const saveStatus = async(request, response) => {

    const session = await auth0.getSession(request)

    if(session) {
        const datas = request.body
        await setStatus(session.user.sub, datas)
    }

    response.send({ ok: true })
}