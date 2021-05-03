import axios from 'axios'
import {CART_ADD_ITEM, CART_REMOVE_ITEM} from '../constants/cartConstants'

function addToCart(id, qty){
    
    return (dispatch, getState) => {
        axios.get(`/api/products/${id}`)
        .then(res => {
            dispatch({
                type: CART_ADD_ITEM,
                payload: {
                    product: res.data._id,
                    name: res.data.name,
                    image: res.data.image,
                    price: res.data.price,
                    countInStock: res.data.countInStock,
                    qty
                }
            })

            localStorage.setItem('cartItems', JSON.stringify( getState().cart.cartItems))
        })
    }
}

function removeFromCart(id){
    return (dispatch, getState) => {
        dispatch({
            type: CART_REMOVE_ITEM,
            payload: id
        })

        localStorage.setItem('cartItems', JSON.stringify( getState().cart.cartItems))
    }
}
export { addToCart, removeFromCart }