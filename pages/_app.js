import React from 'react'

import '../styles/styles.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { AuthProvider } from '../lib/AuthContext'

const App = ({ Component, pageProps }) => {
    return (
        <AuthProvider>
            <div>
                <Header />
                <section className='min-h-screen container px-32 pt-10'>
                    <Component {...pageProps} />
                </section>
                <Footer />
            </div>
        </AuthProvider>
    )
}

export default App