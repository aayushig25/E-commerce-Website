import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link, useHistory } from 'react-router-dom'
import { Row, Col, Image, Card, ListGroup, Button, Form } from "react-bootstrap"
import { LinkContainer } from 'react-router-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { detailProduct, createProductReview } from '../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'


function ProductPage() {

    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const { id } = useParams();
    //const product = products.find((p) => p._id == id )
    const dispatch = useDispatch()
    const productDetail = useSelector(state => state.productDetail)

    const {product, loading, error} = productDetail
    const history = useHistory()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const productCreateReview = useSelector(state => state.productCreateReview)
    const {
        loading: loadingProductReview,
        error: errorProductReview,
        success: successProductReview,
    } = productCreateReview

    useEffect(() => {
        if (successProductReview|| errorProductReview) {
            setRating(0)
            setComment('')
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
        }
        dispatch(detailProduct(id))

    }, [dispatch, successProductReview, id])

    function addToCartHandler(){
        history.push(`/cart/${id}?qty=${qty}`)
    }

    function submitHandler(e){
        e.preventDefault()
        dispatch(createProductReview(
            id, {
                rating,
                comment
            }
        ))
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
                    <div>
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
                        
                        <Row>
                            <Col md={6}>
                                <h4>Reviews</h4>
                                {product.reviews.length === 0 && <Message variant='info'>No Reviews</Message>}

                                <ListGroup variant='flush'>
                                    {product.reviews.map((review) => (
                                        <ListGroup.Item key={review._id}>
                                            <strong>{review.name}</strong>
                                            <Rating value={review.rating} color='#f8e825' />
                                            <p>{review.createdAt.substring(0, 10)}</p>
                                            <p>{review.comment}</p>
                                        </ListGroup.Item>
                                    ))}

                                    <ListGroup.Item>
                                        <h4>Write a review</h4>

                                        {loadingProductReview && <Loader />}
                                        {successProductReview && <Message variant='success'>Review Submitted</Message>}
                                        {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}

                                        {userInfo ? (
                                            <Form onSubmit={submitHandler}>
                                                <Form.Group controlId='rating'>
                                                    <Form.Label>Rating</Form.Label>
                                                    <Form.Control
                                                        as='select'
                                                        value={rating}
                                                        onChange={(e) => setRating(e.target.value)}
                                                    >
                                                        <option value=''>Select...</option>
                                                        <option value='1'>1 - Poor</option>
                                                        <option value='2'>2 - Fair</option>
                                                        <option value='3'>3 - Good</option>
                                                        <option value='4'>4 - Very Good</option>
                                                        <option value='5'>5 - Excellent</option>
                                                    </Form.Control>
                                                </Form.Group>

                                                <Form.Group controlId='comment'>
                                                    <Form.Label>Review</Form.Label>
                                                    <Form.Control
                                                        as='textarea'
                                                        row='5'
                                                        value={comment}
                                                        onChange={(e) => setComment(e.target.value)}
                                                    ></Form.Control>
                                                </Form.Group>

                                                <Button
                                                    disabled={loadingProductReview}
                                                    type='submit'
                                                    variant='primary'
                                                >
                                                    Submit
                                                </Button>

                                            </Form>
                                        ) : (
                                                <Message variant='info'>Please <Link to='/login'>login</Link> to write a review</Message>
                                            )}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
                        </Row>
                    </div>
                )
            }

        </div>
    )
}

export default ProductPage
