import React, { useEffect } from 'react'
import router from 'next/router'

import auth0 from '../lib/auth0'
import { db } from '../lib/db' 
import { checkExistsUser, findChecksNearbyCheckin } from '../lib/markers'

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
        const todaysCheckin = await checkExistsUser(session.user.sub)

        const todaysData = todaysCheckin.data()
        let forceCreate = true
        if(todaysData) {
            forceCreate = false
            const checkinsList = await findChecksNearbyCheckin(todaysData)

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