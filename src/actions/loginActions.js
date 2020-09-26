import {SAVE_LOGIN,SAVE_TIPO} from './types'

export const SaveLogin = (login) => async (dispatch/* ,getState */) => {
    dispatch({
        type: SAVE_LOGIN,
        payload: login
    })
}

export const SaveTipo = (tipo) => async (dispatch/* ,getState */) => {
    dispatch({
        type: SAVE_TIPO,
        payload: tipo
    })
}