import React, { useEffect } from 'react'
import router from 'next/router'

import auth0 from '../lib/auth0'

const App = props => {

    useEffect(() => {
        if(!props.isAuth) {
            router.push('/')
        }
    })

    if(!props.isAuth) {
        return null
    }

    return (
        <section>
            <h1>APP</h1>
            <pre>{ JSON.stringify(props, null, 2) }</pre>
        </section>
    )
}

export default App

export async function getServerSideProps({ req, res }) {

    let user = {}
    let isAuth = false

    const session = await auth0.getSession(req)

    if(session) {
        isAuth = true
        user = session.user
    }

    return {
        props: {
            isAuth,
            user
        }
    }
}