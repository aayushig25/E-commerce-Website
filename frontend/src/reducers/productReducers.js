import { 
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,

    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL
} from '../constants/productConstants'

const initialState = {
    loading : false,
    products : [],
    error : ''
}

function productListReducer(state=initialState, action){
    switch(action.type){
        case PRODUCT_LIST_REQUEST:
            return {...state, loading : true, products : [] }

        case PRODUCT_LIST_SUCCESS:
            return {...state, loading : false, products : action.payload }

        case PRODUCT_LIST_FAIL:
            return {...state, loading : false, error : action.payload }

        default:
            return state
    }
}

const initState = {
    loading : false,
    product : {
        reviews: []
    },
    error: ''
}

function productDetailReducer(state=initState, action){
    switch(action.type){
        case PRODUCT_DETAILS_REQUEST:
            return {...state, loading : true }

        case PRODUCT_DETAILS_SUCCESS:
            return {...state, loading : false, product : action.payload }

        case PRODUCT_DETAILS_FAIL:
            return {...state, loading : false, error : action.payload }

        default:
            return state
    }
}

export { productListReducer, productDetailReducer }