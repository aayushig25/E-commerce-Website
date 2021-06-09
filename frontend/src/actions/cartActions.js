import axios from 'axios'
import { 
    CART_ADD_ITEM, 
    CART_REMOVE_ITEM, 
    CART_SAVE_SHIPPING_ADDRESS,
    CART_SAVE_PAYMENT_METHOD
} from '../constants/cartConstants'

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
                    qty: qty,
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

function saveShippingAddress(data){
    return (dispatch) => {
        dispatch({
            type: CART_SAVE_SHIPPING_ADDRESS,
            payload: data
        })

        localStorage.setItem('shippingAddress', JSON.stringify(data))
    }
}

function savePaymentMethod(data){
    return (dispatch) => {
        dispatch({
            type: CART_SAVE_PAYMENT_METHOD,
            payload: data
        })

        localStorage.setItem('paymentMethod', JSON.stringify(data))
    }
}
export { addToCart, removeFromCart, saveShippingAddress, savePaymentMethod }