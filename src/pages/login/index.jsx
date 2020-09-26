import React, { useState } from 'react'
import Layout from '../../globalComponents/layout'
import { Helmet } from 'react-helmet'
import FormAuth from '../../globalComponents/formAuth'
import { useFirebaseApp } from 'reactfire'
import { useDispatch } from 'react-redux'
import { SaveLogin } from "../../actions/loginActions";

const Login = () => {

    const [email, setemail] = useState(null)
    const [password, setpassword] = useState(null)
    const firebase = useFirebaseApp();
    const dispatch = useDispatch();

    async function submit(ev) {
        ev.preventDefault();
        console.log("login!")
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
            const token = await firebase.auth()?.currentUser?.getIdToken(true);
            //4 - check if have token in the current user
            if (token) {
                //5 - put the token at localStorage (We'll use this to make requests)
                localStorage.setItem("@token", token);
                dispatch(SaveLogin(true))
                //6 - navigate user to the book list
                //history.push("/");
            }
        } catch (error) {
            console.log(error.response)
        }
    }

    async function withGoogle() {
        console.log("login google!")
        const provider = new firebase.auth.GoogleAuthProvider()
        await firebase.auth().signInWithPopup(provider).then(
            async (result) => {
                console.log("yeeeeh")
                //3 - pick the result and store the token
                const token = await firebase.auth()?.currentUser?.getIdToken(true);
                //4 - check if have token in the current user
                if (token) {
                    //5 - put the token at localStorage (We'll use this to make requests)
                    localStorage.setItem("@token", token);
                    dispatch(SaveLogin(true))
                    //6 - navigate user to the book list
                    //history.push("/");
                }
            },
            function (error) {
                console.log(error);
            }
        );
    }

    async function withFacebook() {
        console.log("login facebook!")
        const provider = new firebase.auth.FacebookAuthProvider()
        await firebase.auth().signInWithPopup(provider).then(
            async (result) => {
                console.log("yeeeeh")
                //3 - pick the result and store the token
                const token = await firebase.auth()?.currentUser?.getIdToken(true);
                //4 - check if have token in the current user
                if (token) {
                    //5 - put the token at localStorage (We'll use this to make requests)
                    localStorage.setItem("@token", token);
                    dispatch(SaveLogin(true))
                    //6 - navigate user to the book list
                    //history.push("/");
                }
            },
            function (error) {
                console.log(error);
            }
        );
    }

    return (
        <Layout>
            <Helmet>
                <title>Login | RCA</title>
                <meta name="description" content="Login" />
            </Helmet>

            <h1 className="text-center text-2xl text-red-700 my-2">Logéate con tu usuario</h1>
            <FormAuth email={(dat) => setemail(dat)} password={(dat) => setpassword(dat)} type="login"
                submit={submit} withGoogle={() => withGoogle()} withFacebook={() => withFacebook()}
            />
        </Layout>
    )
}

export default Login
