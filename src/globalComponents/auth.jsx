import React from 'react'
import "firebase/auth"
import { useFirebaseApp, useUser } from 'reactfire'
import { useState } from 'react'

const Auth = () => {

    const [email, setemail] = useState(null)
    const [password, setpassword] = useState(null)
    const firebase = useFirebaseApp();
    const user = useUser();

    async function submit(ev) {
        ev.preventDefault()
        console.log("new user!")
        try {
            const res = await firebase.auth().createUserWithEmailAndPassword(email, password)
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }

    async function logout() {
        console.log("logout!")
        await firebase.auth().signOut();
    }

    async function login() {
        console.log("login!")
        await firebase.auth().signInWithEmailAndPassword(email, password);
    }

    return (
        <div>
            <h2 className="text-center text-2xl text-red-700 my-2">Usuario: {user && user.email ? user.email : "no logeado"}</h2>
            {!user ? <form onSubmit={submit} className="flex justify-center flex-col items-center block pb-2 w-full sm:w-1/3 border border-blue-600 rounded mx-auto my-4">

                <div className="w-full my-2">
                    <label htmlFor="email" className="block mx-auto text-center">Correo electrónico</label>
                    <input className="border border-blue-500 block w-3/4 mx-auto" type="email" name="email" id="email" onChange={(ev) => setemail(ev.target.value)} />
                </div>

                <div className="w-full my-2">
                    <label htmlFor="password" className="block mx-auto text-center">Contraseña</label>
                    <input className="border border-blue-500 block w-3/4 mx-auto" type="password" name="password" id="password" onChange={(ev) => setpassword(ev.target.value)} />
                </div>

                <div >
                    <button type="submit" className="block mx-auto my-2 border border-red-700 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded px-2">Crear cuenta</button>
                    <button onClick={() => login()}
                        type="button" className="block mx-auto my-2 border border-red-700 bg-yellow-600 hover:bg-yellow-500 text-white font-bold rounded px-2">Logéate</button>
                </div>
            </form> :
                <div className="text-center">
                    <button onClick={() => logout()}
                        type="button" className="border border-red-700 bg-red-600 hover:bg-red-500 text-white font-bold rounded px-2">Cerrar sesión</button>
                </div>
            }
        </div>
    )
}

export default Auth
