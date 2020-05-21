import { db } from '../lib/db'
import { currentDateToday, distanceCoordinates } from '../lib/functions-help'
import admin from  'firebase-admin'

export const checkExistsUser = async user => {

    const todayCheckin = await db
        .collection('markers')
        .doc(currentDate)
        .collection('check')
        .doc(user)
        .get()

    const todaysData = todayCheckin.data()

    return todaysData
}

export const findChecksNearbyCheckin = async checkin => {

    const checkinsList = []

    const checkins = await db.collection('markers')
        .doc(currentDate)
        .collection('checks')
        .near({
            center: checkin.coordinates,
            radius: 1000 
        })
        .get()

    checkins.docs.forEach(doc => {
        checkinsList.push({
            id: doc.id,
            status: doc.data().status,
            coords: {
                lat: doc.data().coordinates.latitude,
                long: doc.data().coordinates.longittude
            },
            distance: distanceCoordinates(
                checkin.coordinates.latitude,
                checkin.coordinates.longitude,
                doc.data().coordinates.latitude,
                doc.data().coordinates.longittude
            ).toFixed(2)
        })
    })

    return checkinsList
}

export const setStatus = async (user, datas) => {

    await db
        .collection('markers')
        .doc(currentDate)
        .collection('checks')
        .doc(user)
        .set({
            status: datas.status,
            user: user,
            coordinates: new admin.firestore.GeoPoint(
                datas.coords.lat,
                datas.coords.long
            )
        })
}

const currentDate = currentDateToday()