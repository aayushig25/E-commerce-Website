import React, { useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProducts } from '../actions/productActions'


function HomePage() {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const history = useHistory()

    const {error, loading, products} = productList
    let keyword = history.location.search
    

    useEffect(() => {
        dispatch(listProducts(keyword))
        //console.log(keyword)

    },[dispatch, keyword, history])

    return (
        <div>
            <h1>Latest Products</h1>
            {loading ? <Loader />
              :  error ? <Message variant='danger'>{error}</Message>
              :  
                <Row>
                    { products.map(product => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={product}/>
                        </Col>
                    ))
                    }
                </Row>
            }

            
        </div>
    )
}

export default HomePage
