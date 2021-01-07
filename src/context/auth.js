import React, { createContext, useReducer } from 'react';
import jwtDecode from 'jwt-decode';

const initialState = {
    user: null
}

if (localStorage.getItem('jwtToken')) {
    const decodedToken = jwtDecode(localStorage.getItem('jwtToken'))

    // multiply be 1000 to get milliseconds. If smaller than Date.now, it has expired.
    if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem('jwtToken')
    } else {
        initialState.user = decodedToken;
    }
}

export const AuthContext = createContext({
    user: null,
    login: (userData) => {},
    logout: () => {}
});

const authReducer = (state, action) => {
    switch(action.type){
        case 'LOGIN':
            return {
                ...state,
                user: action.payload
            }
        case 'LOGOUT':
            return {
                ...state,
                user: null
            }
        default:
            return state;
    }
}

export const AuthProvider = (props) => {

    const [ state, dispatch ] = useReducer(authReducer, initialState)

    const login = (userData) => {
        localStorage.setItem("jwtToken", userData.token);
        dispatch({
            type: 'LOGIN',
            payload: userData
        })
    }

    const logout = () => {
        localStorage.removeItem('jwtToken');
        dispatch({ type: 'LOGOUT' }); 
    }

    return (
        <AuthContext.Provider value={{ user: state.user, login, logout }}>
            {props.children}
        </AuthContext.Provider>
    )
} 
// export { AuthContext, AuthProvider }