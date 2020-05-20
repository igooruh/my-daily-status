import { db } from './db'
import { currentDateToday, distanceCoordinates } from '../lib/functions-help'

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

const currentDate = currentDateToday()