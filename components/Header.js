import React, { useState, useEffect, useContext } from 'react'

import NavBar from '../components/NavBar'
import { useAuth } from '../lib/AuthContext'

const Header = () => {

    const auth = useAuth()

    return (
        <div>
            <header className='bg-gray-200'>
                <h1><img className='h-24 py-4 mx-auto' src='/logo.png' alt='Olá Next' height='60' /></h1>
                <NavBar />
            </header>
        </div>
    )
}

export default Header