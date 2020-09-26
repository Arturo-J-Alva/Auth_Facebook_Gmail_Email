import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const FormAuth = ({ submit, email, password, type, withGoogle, withFacebook }) => {
    return (
        <form onSubmit={submit} className="flex justify-center flex-col items-center block pb-2 w-full sm:w-1/3 border border-blue-600 rounded mx-auto my-4">

            <div className="w-full my-2">
                <label htmlFor="email" className="block mx-auto text-center">Correo electrónico</label>
                <input className="border border-blue-500 block w-3/4 mx-auto" type="email" name="email" id="email" onChange={(ev) => email(ev.target.value)} />
            </div>

            <div className="w-full my-2">
                <label htmlFor="password" className="block mx-auto text-center">Contraseña</label>
                <input className="border border-blue-500 block w-3/4 mx-auto" type="password" name="password" id="password" onChange={(ev) => password(ev.target.value)} />
            </div>

            <div className="px-8">
                <button type="submit" className="w-full my-2 border border-red-700 bg-gray-600 hover:bg-gray-500 text-white font-bold rounded px-2"> {type === "signup" ? "Crear usuario" : "Logéate con correo"} </button>
                {type !== "signup"&&<Fragment>
                    <button onClick={() => withGoogle()}
                    type="button" className="w-full mx-auto my-2 border border-red-700 bg-gray-300 hover:bg-gray-200 text-gray-800 font-bold rounded px-2"> {type === "signup" ? "Crear usuario Google" : "Logéate con Google"} </button>
                <button onClick={() => withFacebook()}
                    type="button" className="w-full my-2 border border-red-700 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded px-2"> {type === "signup" ? "Crear usuario Facebook" : "Logéate con Facebook"} </button>
                    </Fragment>}
                <div className="text-center">
                    <Link to={type === "signup" ? "/login" : "/signup"}
                        type="button" className="my-2 hover:text-gray-700 text-gray-800 font-bold rounded px-2 hover:underline"> {type === "signup" ? "¿Ya te registraste?" : "Regístrate sino logéate con Facebook o Google"}  </Link>
                </div>
            </div>
        </form>
    )
}

export default FormAuth
