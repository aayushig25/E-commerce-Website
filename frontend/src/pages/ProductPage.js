import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link, useHistory } from 'react-router-dom'
import { Row, Col, Image, Card, ListGroup, Button, Form } from "react-bootstrap"
import { LinkContainer } from 'react-router-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { detailProduct, listProduct } from '../actions/productActions'


function ProductPage() {

    const [qty, setQty] = useState(1)
    const { id } = useParams();
    //const product = products.find((p) => p._id == id )
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productDetail)

    const {product, loading, error} = productList
    const history = useHistory()

    useEffect(() => {
        dispatch(detailProduct(id))
    },[dispatch])

    function addToCartHandler(){
        history.push(`/cart/${id}?qty=${qty}`)
    }
    return (
        <div>
            <LinkContainer to='/' className='my-3 p-2'>
                <Button>Go Back</Button>
            </LinkContainer>

            {
                loading ? <Loader />
                : error ? <Message variant ='danger'>{error}</Message>
                : (
                    <Row>
                        <Col md={6}>
                        <Image src={product.image} fluid />
                        </Col>

                        <Col md={3}>
                        <ListGroup >
                            <ListGroup.Item>
                                <h2>{product.name}</h2>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Rating value={product.rating} reviews={`${product.numReviews} reviews` } color="#ffce67"/>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                Price : $ {product.price}
                            </ListGroup.Item>

                            <ListGroup.Item>
                                Description : {product.description}
                            </ListGroup.Item>
                        </ListGroup>
                        </Col>

                        <Col md={3}>
                            <ListGroup>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price :</Col>
                                    <Col>
                                        <strong>${product.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Status :</Col>
                                    <Col>
                                        {product.countInStock>0 ? 'In stock' : 'Out of stock'}
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            {product.countInStock>0 && (
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Qty :</Col>
                                        <Col>
                                        <Form.Control as="select" value={qty} onChange={e => {setQty(e.target.value)}}>
                                             {
                                                 [...Array(product.countInStock).keys()].map(x =>(
                                                     <option key={x+1} value={x+1}>
                                                         {x+1}
                                                     </option>
                                                 ))
                                             }
                                        </Form.Control>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            )}

                            <ListGroup.Item>
                                <Button type='button' disabled={product.countInStock == 0} onClick={addToCartHandler} className='btn-block'>Add to Cart</Button>
                            </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                )
            }

        </div>
    )
}

export default ProductPage
