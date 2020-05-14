import React, { useState } from 'react'
import axios from 'axios'

import auth0 from '../lib/auth0'

const CreateStatus = () => {

    const [dados, setDados] = useState({
        status: 'bem',
        lat: null,
        long: null
    })

    const getMyLocation = () => {

        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                setDados(oldDatas => {

                    return {
                        ...oldDatas,
                        coords: {
                            lat: position.coords.latitude,
                            long: position.coords.longitude
                        }
                    }
                })
            })
        }
    }

    const onStatusChenge = eventRadio => {

        const value = event.target.value

        setDados(oldValues => {

            return {
                ...oldValues,
                status: value
            }
        })
    }

    const save = async() => {

        await axios.post('/api/save-status', dados)
    }

    return (
        <section>
            <h1>Create Status</h1>
            <label className='block'>
                <input type='radio' name='status' value='bem' onChange={onStatusChenge} />{' '}Estou bem
            </label>
            <label className='block'>
                <input type='radio' name='status' value='gripe' onChange={onStatusChenge} />{' '}Estou com sintomas de gripe / resfriado
            </label>
            <label className='block'>
                <input type='radio' name='status' value='covid' onChange={onStatusChenge} />{' '}Estou com sintomas de COVID-19 / resfriado
            </label>

            Sua posição atual: {JSON.stringify(dados)}

            <button className='py-4 px-2 rounded bg-pink-800 font-bold shadow-xl hover:shadow block w-1/4 text-center mx-auto text-white'
                onClick={getMyLocation}>
                Minha localização
            </button>
            <button className='py-4 px-2 rounded bg-pink-800 font-bold shadow-xl hover:shadow block w-1/4 text-center mx-auto text-white'
                onClick={save}>
                Salvar meu Status
            </button>
        </section>
    )
}

export default CreateStatus

export async function getServerSideProps({ req, res }) {

    const session = await auth0.getSession(req)

    if(session) {
        return {
            props: {
                isAuth: true,
                user: session.user
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