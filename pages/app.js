import React from 'react'

import auth0 from '../lib/auth0'

const App = () => {

    return (
        <h1>APP</h1>
    )
}

export default App

export async function getServerSideProps({ req, res }) {

    const session = auth0.getSession(req)
    return {
        props: {
            user: {

            }
        }
    }
}