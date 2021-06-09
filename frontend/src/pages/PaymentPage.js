import React, { useState, useEffect } from 'react'
import {Form, Button, Row, Col} from 'react-bootstrap'
import { useLocation, Link, useHistory} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../pages/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'

function PaymentPage() {
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart
    const dispatch = useDispatch()
    const history = useHistory()

    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    if(!shippingAddress.address){
        history.push('/shipping')
    }

    function submitHandler(e){
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }
    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />

            <Form onSubmit={submitHandler}>
               <Form.Group>
                  <Form.Label>Select Method</Form.Label>
                  <Col>
                      <Form.Check
                        type='radio'
                        id='paypal'
                        label='PayPal or Credit Card'
                        name='paymentMethod'
                        checked
                        onChange = {(e) => setPaymentMethod(e.target.value)}
                      >
                      </Form.Check>
                  </Col>
               </Form.Group>

               <Button type='submit' variant='primary'>
                  Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentPage
