import admin from 'firebase-admin'

import { db } from '../../lib/db'
import auth0 from '../../lib/auth0'
import FunctionHelper from '../../lib/functions-help'

const saveStatus = async(request, response) => {

    const session = await auth0.getSession(request)
    
    if(session) {
        const datas = request.body
        const currentDate = FunctionHelper.currentDateToday()

        await db
            .collection('markers')
            .doc(currentDate)
            .collection('checks')
            .doc(session.user.sub)
            .set({
                status: datas.status,
                user: session.user.sub,
                coordinates: new admin.firestore.GeoPoint(
                    datas.coords.lat,
                    datas.coords.long
                )
            })

        response.send({ ok: true })
    }
}

export default saveStatus