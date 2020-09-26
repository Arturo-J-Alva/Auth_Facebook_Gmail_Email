import React from 'react'
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom"

import Home from './pages/home'
import Error404 from './pages/404'

import ScrollToTop from './globalComponents/ScrollToTop'
import { useDispatch, useSelector } from "react-redux";
import Login from './pages/login'
import SignUp from './pages/signup'
import { useUser } from 'reactfire'
import { useEffect } from 'react'
import { SaveLogin } from './actions/loginActions'
//const { EndPoint } = Global

const Routes = () => {

    const LoginState = useSelector(reducers => reducers.loginReducer).Login;
    const dispatch = useDispatch()
    const user = useUser();

    useEffect(() => {
        const token = localStorage.getItem("@token")
        if (token && user) {
            dispatch(SaveLogin(true))
        } else {
            dispatch(SaveLogin(false))
        }
    }, [user, dispatch])

    console.log('LoginState:', LoginState)

    return (
        <BrowserRouter>
            <ScrollToTop />
            <Switch>
                {LoginState ? <Route exact path="/login" render={() => <Redirect to='/' />} /> :
                    <Route exact path="/login" component={Login} />
                }
                {LoginState ? <Route exact path="/signUp" render={() => <Redirect to='/' />} /> :
                    <Route exact path="/signUp" component={SignUp} />
                }
                {LoginState ? <Route exact path="/" component={Home} /> :
                    <Route exact path="/" render={() => <Redirect to='/login' />} />
                }

                <Route component={Error404} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes
