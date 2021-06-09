import axios from 'axios'
import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,

    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,

    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_RESET,

    ORDER_LIST_MY_REQUEST,
    ORDER_LIST_MY_SUCCESS,
    ORDER_LIST_MY_FAIL,
    ORDER_LIST_MY_RESET,

    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL,

    ORDER_DELIVER_REQUEST,
    ORDER_DELIVER_SUCCESS,
    ORDER_DELIVER_FAIL,
    ORDER_DELIVER_RESET,

} from '../constants/orderConstants'

import { CART_CLEAR_ITEMS } from '../constants/cartConstants'

function createOrder(order){
    return (dispatch, getState) => {
        dispatch({type : ORDER_CREATE_REQUEST})
        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`
            }
        }

        axios.post( 
            `/api/orders/add/`,
             order,
             config
        )
        .then(res =>{
            dispatch({
                type: ORDER_CREATE_SUCCESS,
                payload: res.data
            })

            dispatch({
                type: CART_CLEAR_ITEMS,
                payload: res.data
            })

            localStorage.removeItem('cartItems')
        })
        .catch(err => {
            dispatch({
                type: ORDER_CREATE_FAIL,
                payload: err.response && err.response.data.detail
                  ? err.response.data.detail
                  : err.message,
            })
        })
    }
}

function getOrderDetails(id){
   return (dispatch, getState) =>{
        dispatch({ type: ORDER_DETAILS_REQUEST })
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
            `/api/orders/${id}/`,
            config
        )
        .then(res =>{
            dispatch({
                type: ORDER_DETAILS_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: ORDER_DETAILS_FAIL,
                payload: err.response && err.response.data.detail
                  ? err.response.data.detail
                  : err.message,
            })
        })
    }
}

function payOrder(id, paymentResult){
   return (dispatch, getState) =>{
        dispatch({ type: ORDER_PAY_REQUEST })
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
            `/api/orders/${id}/pay/`,
            paymentResult,
            config
        )
        .then(res =>{
            dispatch({
                type: ORDER_PAY_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: ORDER_PAY_FAIL,
                payload: err.response && err.response.data.detail
                  ? err.response.data.detail
                  : err.message,
            })
        })
    }
}


function deliverOrder(order){
    return (dispatch, getState) =>{
         dispatch({ type: ORDER_DELIVER_REQUEST })
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
             `/api/orders/${order._id}/deliver/`,
             {},
             config
         )
         .then(res =>{
             dispatch({
                 type: ORDER_DELIVER_SUCCESS,
                 payload: res.data
             })
         })
         .catch(err => {
             dispatch({
                 type: ORDER_DELIVER_FAIL,
                 payload: err.response && err.response.data.detail
                  ? err.response.data.detail
                  : err.message,
             })
         })
     }
 }

function listMyOrders(){
    return (dispatch, getState) =>{
         dispatch({ type: ORDER_LIST_MY_REQUEST })
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
             `/api/orders/myorders/`,
             config
         )
         .then(res =>{
             dispatch({
                 type: ORDER_LIST_MY_SUCCESS,
                 payload: res.data
             })
         })
         .catch(err => {
             dispatch({
                 type: ORDER_LIST_MY_FAIL,
                 payload: err.response && err.response.data.detail
                  ? err.response.data.detail
                  : err.message,
             })
         })
     }
}

function listOrders(){
    return (dispatch, getState) =>{
         dispatch({ type: ORDER_LIST_REQUEST })
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
             `/api/orders/`,
             config
         )
         .then(res =>{
             dispatch({
                 type: ORDER_LIST_SUCCESS,
                 payload: res.data
             })
         })
         .catch(err => {
             dispatch({
                 type: ORDER_LIST_FAIL,
                 payload: err.response && err.response.data.detail
                  ? err.response.data.detail
                  : err.message,
             })
         })
     }
}



export {createOrder, getOrderDetails, payOrder, listMyOrders, listOrders, deliverOrder}