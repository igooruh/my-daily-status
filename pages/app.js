import React, { useEffect } from 'react'
import router from 'next/router'

import auth0 from '../lib/auth0'
import { checkExistsUser, findChecksNearbyCheckin } from '../model/markers'

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
                        <tr key={ checkin.id }>
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

    let user = {}
    let isAuth = false
    let forceCreate = false
    let checkins = []
    const session = await auth0.getSession(req)

    if(session) {
        isAuth = true
        user = session.user
        const todayCheckin = await checkExistsUser(session.user.sub)

        if(!todayCheckin) {
            forceCreate = true
        } else {
            checkins = await findChecksNearbyCheckin(todayCheckin)
        }
    }

    return {
        props: {
            isAuth,
            user,
            forceCreate,
            checkins
        }
    }
}