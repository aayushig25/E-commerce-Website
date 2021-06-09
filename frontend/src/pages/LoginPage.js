import React, { useState, useEffect } from 'react'
import {login, logout} from '../actions/userActions'
import {Form, Button, Row, Col} from 'react-bootstrap'
import { useLocation, Link, useHistory} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'

function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const location = useLocation();
    const history = useHistory();
    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userLogin = useSelector(state => state.userLogin)
    const {error, loading, userInfo} = userLogin

    useEffect(() =>{
        if(userInfo){
            history.push(redirect)
        }
    },[history, userInfo, redirect])

    function submitHandler(e)
    {
        e.preventDefault()
        dispatch(login(email, password))
    }

    return (
        <FormContainer>
            <h1>Sign In</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                       type="email"
                       placeholder="Enter email"
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="Password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                       placeholder="Password"
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Sign In
                </Button>
            </Form>

            <Row>
                <Col>
                    New Customer? <Link to={`/register`}>Register</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginPage
