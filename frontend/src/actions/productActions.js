import axios from 'axios'
import { 
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,

    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,

    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,

    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_RESET,

    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_RESET,

    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_CREATE_REVIEW_RESET,
} from '../constants/productConstants'

function listProducts(keyword=''){
    return (dispatch) => {
        dispatch({type : PRODUCT_LIST_REQUEST})


        axios.get(`/api/products${keyword}`)
        .then(res =>{
            dispatch({
                type: PRODUCT_LIST_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: PRODUCT_LIST_FAIL,
                payload: err.response && err.response.data.detail
                  ? err.response.data.detail
                  : err.message,
            })
        })
    }
}


function detailProduct(id){
    return (dispatch) => {
        dispatch({type : PRODUCT_DETAILS_REQUEST})

        axios.get( `/api/products/${id}/`)
        .then(res =>{
            dispatch({
                type: PRODUCT_DETAILS_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: PRODUCT_DETAILS_FAIL,
                payload: err.response && err.response.data.detail
                  ? err.response.data.detail
                  : err.message,
            })
        })
    }
}

function deleteProduct(id){
    return (dispatch, getState) =>{
         dispatch({ type: PRODUCT_DELETE_REQUEST })
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
             `/api/products/delete/${id}/`,
             config
         )
         .then(res =>{
             dispatch({
                 type: PRODUCT_DELETE_SUCCESS,
             })
         })
         .catch(err => {
             dispatch({
                 type: PRODUCT_DELETE_FAIL,
                 payload: err.response && err.response.data.detail
                  ? err.response.data.detail
                  : err.message,
             })
         })
     }
}

function createProduct(){
    return (dispatch, getState) =>{
         dispatch({ type: PRODUCT_CREATE_REQUEST })
         const {
             userLogin: { userInfo },
         } = getState()
 
         const config = {
             headers: {
                 'Content-type': 'application/json',
                 Authorization: `Bearer ${userInfo.token}`
             }
         }
 
         axios.post(
             `/api/products/create/`,
             {},
             config
         )
         .then(res =>{
             dispatch({
                 type: PRODUCT_CREATE_SUCCESS,
                 payload: res.data
             })
         })
         .catch(err => {
             dispatch({
                 type: PRODUCT_CREATE_FAIL,
                 payload: err.response && err.response.data.detail
                  ? err.response.data.detail
                  : err.message,
             })
         })
     }
}

function updateProduct(product){
    return (dispatch, getState) =>{
         dispatch({ type: PRODUCT_UPDATE_REQUEST })
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
             `/api/products/update/${product._id}/`,
             product,
             config
         )
         .then(res =>{
             dispatch({
                 type: PRODUCT_UPDATE_SUCCESS,
                 payload: res.data
             })
             dispatch({
                type: PRODUCT_DETAILS_SUCCESS,
                payload: res.data
            })
         })
         .catch(err => {
             dispatch({
                 type: PRODUCT_UPDATE_FAIL,
                 payload: err.response && err.response.data.detail
                  ? err.response.data.detail
                  : err.message,
             })
         })
     }
}

function createProductReview(id, review){
    return (dispatch, getState) =>{
         dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST })
         const {
             userLogin: { userInfo },
         } = getState()
 
         const config = {
             headers: {
                 'Content-type': 'application/json',
                 Authorization: `Bearer ${userInfo.token}`
             }
         }
 
         axios.post(
             `/api/products/${id}/review/`,
             review,
             config
         )
         .then(res =>{
             dispatch({
                 type: PRODUCT_CREATE_REVIEW_SUCCESS,
                 payload: res.data
             })
         })
         .catch(err => {
             dispatch({
                 type: PRODUCT_CREATE_REVIEW_FAIL,
                 payload: err.response && err.response.data.detail
                  ? err.response.data.detail
                  : err.message,
             })
         })
     }
}
export {listProducts, detailProduct, deleteProduct, createProduct, updateProduct, createProductReview }