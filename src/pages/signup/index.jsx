import React, { useState } from 'react'
import Layout from '../../globalComponents/layout'
import { Helmet } from 'react-helmet'
import FormAuth from '../../globalComponents/formAuth'
import { useFirebaseApp } from 'reactfire'

const SignUp = ({history}) => {
    const [email, setemail] = useState(null)
    const [password, setpassword] = useState(null)
    const firebase = useFirebaseApp();

    async function submit(ev) {
        ev.preventDefault()
        console.log("new user!")
        try {
            const res = await firebase.auth().createUserWithEmailAndPassword(email, password)
            console.log(res)
            history.push("/login")
        } catch (error) {
            console.log(error)
        }
    }
    
    return (
        <Layout>
            <Helmet>
                <title>SignUp | RCA</title>
                <meta name="description" content="SignUp" />
            </Helmet>
            <h1 className="text-center text-2xl text-red-700 my-2">Registrar nuevo usuario</h1>
            <FormAuth email={(dat)=>setemail(dat)} password={(dat)=>setpassword(dat)} type="signup" 
            submit={submit} />
        </Layout>
    )
}

export default SignUp
