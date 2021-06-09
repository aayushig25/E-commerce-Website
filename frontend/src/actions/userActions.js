import axios from 'axios'
import { 
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,

    USER_LOGOUT,

    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,

    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_RESET,

    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_RESET,

    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_RESET,

    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,

    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,

} from '../constants/userConstants'

import {ORDER_LIST_MY_RESET} from '../constants/orderConstants'

function login(email, password){
    return (dispatch) => {
        dispatch({type : USER_LOGIN_REQUEST})
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        axios.post( `/api/users/login/`,
        {'username': email, 'password': password},
        config
        )
        .then(res =>{
            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: res.data
            })

            localStorage.setItem('userInfo', JSON.stringify(res.data))
        })
        .catch(err => {
            dispatch({
                type: USER_LOGIN_FAIL,
                payload: err.response && err.response.data.detail
                  ? err.response.data.detail
                  : err.message,
            })
        })
    }
}

function register(name, email, password){
    return (dispatch) => {
        dispatch({type : USER_REGISTER_REQUEST})

        axios.post( `/api/users/register/`,
        {'name': name, 'email': email, 'password': password},
        )
        .then(res =>{
            dispatch({
                type: USER_REGISTER_SUCCESS,
                payload: res.data
            })
            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: res.data
            })

            localStorage.setItem('userInfo', JSON.stringify(res.data))
        })
        .catch(err => {
            dispatch({
                type: USER_REGISTER_FAIL,
                payload: err.response && err.response.data.detail
                  ? err.response.data.detail
                  : err.message,
            })
        })
    }
}

function logout(){
    return (dispatch) => {
        localStorage.removeItem('userInfo')
        dispatch({ type: USER_LOGOUT })
        dispatch({ type: USER_DETAILS_RESET })
        dispatch({ type: ORDER_LIST_MY_RESET })
        dispatch({ type: USER_LIST_RESET })
    }
}

function getUserDetails(id){
    return (dispatch, getState) => {
        dispatch({type : USER_DETAILS_REQUEST})
        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`
            }
        }

        axios.get( 
            `/api/users/${id}/`,
             config
        )
        .then(res =>{
            dispatch({
                type: USER_DETAILS_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: USER_DETAILS_FAIL,
                payload: err.response && err.response.data.detail
                  ? err.response.data.detail
                  : err.message,
            })
        })
    }
}

function updateUserProfile(user){
    return (dispatch, getState) => {
        dispatch({type : USER_UPDATE_PROFILE_REQUEST})
        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`
            }
        }

        axios.put( 
            `/api/users/profile/update/`,
             user,
             config
        )
        .then(res =>{
            dispatch({
                type: USER_UPDATE_PROFILE_SUCCESS,
                payload: res.data
            })
            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: res.data
            })

            localStorage.setItem('userInfo', JSON.stringify(res.data))
        })
        .catch(err => {
            dispatch({
                type: USER_UPDATE_PROFILE_FAIL,
                payload: err.response && err.response.data.detail
                  ? err.response.data.detail
                  : err.message,
            })
        })
    }
}

function listUsers(){
    return (dispatch, getState) => {
        dispatch({ type: USER_LIST_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        axios.get(
            `/api/users/`,
            config
        ).then(res => {
            dispatch({
                type: USER_LIST_SUCCESS,
                payload: res.data
            })
        })
        .catch(err =>{
            dispatch({
                type: USER_LIST_FAIL,
                payload: err.response && err.response.data.detail
                  ? err.response.data.detail
                  : err.message,
            })
        })
    }
}


function deleteUser(id){
    return (dispatch, getState) => {
        dispatch({ type: USER_DELETE_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        axios.delete(
            `/api/users/delete/${id}/`,
            config
        ).then(res => {
            dispatch({
                type: USER_DELETE_SUCCESS,
                payload: res.data
            })
        })
        .catch(err =>{
            dispatch({
                type: USER_DELETE_FAIL,
                payload: err.response && err.response.data.detail
                  ? err.response.data.detail
                  : err.message,
            })
        })
    }
}

function updateUser(user){
    return (dispatch, getState) => {
        dispatch({ type: USER_UPDATE_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        axios.put(
            `/api/users/update/${user._id}/`,
            user,
            config
        ).then(res => {
            dispatch({
                type: USER_UPDATE_SUCCESS,
            })
            dispatch({
                type: USER_DETAILS_SUCCESS,
                payload: res.data
            })
        })
        .catch(err =>{
            dispatch({
                type: USER_UPDATE_FAIL,
                payload: err.response && err.response.data.detail
                  ? err.response.data.detail
                  : err.message,
            })
        })
    }
}

export { login, logout, register, getUserDetails, updateUserProfile, listUsers, deleteUser, updateUser}