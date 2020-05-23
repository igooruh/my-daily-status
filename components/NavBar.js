import React from 'react'
import Link from 'next/link'

const NavLink = ({ href, children}) => {
    return (
        <Link href={href}>
            <a className='p-2 hover:underline hover:text-red-800'>{children}</a>
        </Link>
    )
}

const NavBar = () => {

    const auth = useAuth()

    return (
        <div>
            <nav className='bg-gray-500 text-gray-700 text-center'>
                <NavLink href='/sobre'>Sobre</NavLink>
                { !auth.isAuth && <NavLink href='/cadastrar'>Cadastre-se</NavLink> }
                { !auth.isAuth && <NavLink href='/entrar'>Entrar</NavLink> }
                { auth.isAuth && <NavLink href='/api/logout'>Sair</NavLink> }
            </nav>
        </div>
    )
}

export default NavBar