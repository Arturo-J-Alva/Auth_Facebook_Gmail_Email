import React, { useEffect, useState } from 'react'
import Layout from '../../globalComponents/layout'
import { Helmet } from 'react-helmet'
import { useFirebaseApp, useUser } from 'reactfire'
import Axios from 'axios'
import { SaveLogin } from '../../actions/loginActions'
import { useDispatch } from 'react-redux'
import Global from '../../services/Global'

const Home = () => {

    const user = useUser();
    const firebase = useFirebaseApp();
    const [books, setBooks] = useState([]);
    const dispatch = useDispatch();
    const {EndPoint} = Global

    useEffect(() => {
        async function loadBooks() {
            try {
                const token = localStorage.getItem("@token");
                //console.log("token:",token)
                const request = await Axios.get(EndPoint+"books", { headers: { Authorization: `Bearer ${token}` } })
                //fetch the book list
                /* const request = await fetch("http://localhost:5500/books", {
                    //use the authorization
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("@token"),
                    },
                }) */;

                console.log("request:", request)
                //set the book list on state
                setBooks(request.data.books);
            } catch (error) {
                console.log(error.response)
            }
        }
        //invoke the function
        loadBooks();
    }, [EndPoint]);

    async function logout() {
        console.log("logout!")
        localStorage.clear()
        await firebase.auth().signOut();
        dispatch(SaveLogin(false));
    }


    return (
        <Layout>
            <Helmet>
                <title>Inicio | RCA</title>
                <meta name="description" content="Inicio" />
            </Helmet>

            <div className="px-2">
                <div className="text-right">
                    <button onClick={() => logout()}
                        className="inline-block my-2 border border-red-700 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded px-2">Cerrar Sesión</button>
                </div>
                <h1 className="text-center text-red-700 font-bold underline">Hola {user && user.displayName} / {user && user.email} </h1>
                <div className="">
                    {(user && user.photoURL) && <img src={user.photoURL} alt="" className="w-24 block mx-auto" />}
                </div>
                {books.length > 0 ? books.map((book) => (
                    <div key={book.id} className="w-1/2 m-auto border border-blue-700 my-2">
                        <img className="block w-1/2 mx-auto" alt={book} src={book.image} />
                        <h3 className="text-center text-blue-900 font-bold">{book.name}</h3>
                    </div>
                )) :
                    <p className="text-center text-blue-900 font-bold text-2xl">No se pudo obtener la data</p>
                }
            </div>
        </Layout>
    )
}

export default Home
