import axios from 'axios'
import { 
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,

    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL
} from '../constants/productConstants'

function listProducts(){
    return (dispatch) => {
        dispatch({type : PRODUCT_LIST_REQUEST})

        axios.get('/api/products')
        .then(res =>{
            dispatch({
                type: PRODUCT_LIST_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: PRODUCT_LIST_FAIL,
                payload: err.message
            })
        })
    }
}

function detailProduct(id){
    return (dispatch) => {
        dispatch({type : PRODUCT_DETAILS_REQUEST})

        axios.get( `/api/products/${id}`)
        .then(res =>{
            dispatch({
                type: PRODUCT_DETAILS_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: PRODUCT_DETAILS_FAIL,
                payload: err.message
            })
        })
    }
}

export {listProducts, detailProduct}