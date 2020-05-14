import React, { useEffect } from 'react'
import router from 'next/router'

import auth0 from '../lib/auth0'
import { db } from '../lib/db' 
import FunctionHelp from '../lib/functions-help'

const App = props => {

    useEffect(() => {
        if(!props.isAuth) {
            router.push('/')
        } else if(props.forceCreate) {
            router.push('/create-status')
        }
    })

    if(!props.isAuth || props.forceCreate) {
        return null
    }

    return (
        <section>
            <h1>Status próximos a você:</h1>
            <table>
                { props.checkins.map(checkin => {
                    return (
                        <tr>
                            <td>{ checkin.id === props.user.sub && 'Seu status ' }</td>
                            <td>{ checkin.status }</td>
                            <td>{ JSON.stringify(checkin.coords) }</td>
                        </tr>
                    )
                })}
            </table>
        </section>
    )
}

export default App

export async function getServerSideProps({ req, res }) {

    const session = await auth0.getSession(req)

    if(session) {

        const currentDate = FunctionHelp.currentDateToday()
        
        const todaysCheckin = await db
            .collection('markers')
            .doc(currentDate)
            .collection('checks')
            .doc(session.user.sub)
            .get()

        const todaysDate = todaysCheckin.data()
        let forceCreate = true
        if(todaysDate) {
            forceCreate = false
            const checkins = await db.collection('markers')
                .doc(currentDate)
                .collection('checks')
                .near({
                    center: todaysDate.coordinates,
                    radius: 1000 
                })
                .get()

            const checkinsList = []
            checkins.docs.forEach(doc => {
                checkinsList.push({
                    id: doc.id,
                    status: doc.data().status,
                    coords: {
                        lat: doc.data().coordinates.latitude,
                        long: doc.data().coordinates.longittude
                    },
                    distance: FunctionHelp.distanceCoordinates(
                        todaysDate.coordinates.latitude,
                        todaysDate.coordinates.longitude,
                        doc.data().coordinates.latitude,
                        doc.data().coordinates.longittude
                    ).toFixed(2)
                })
            })

            return {
                props: {
                    isAuth: true,
                    user: session.user,
                    forceCreate: false,
                    checkins: checkinsList
                }
            }
        }

        return {
            props: {
                isAuth: true,
                user: session.user,
                forceCreate
            }
        }
    }

    return {
        props: {
            isAuth: false,
            user: {}
        }
    }
}