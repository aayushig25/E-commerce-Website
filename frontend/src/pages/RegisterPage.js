import React, { useState, useEffect } from 'react'
import {register} from '../actions/userActions'
import {Form, Button, Row, Col} from 'react-bootstrap'
import { useLocation, Link, useHistory} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'

function RegisterPage() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()
    const location = useLocation();
    const history = useHistory();
    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userRegister = useSelector(state => state.userRegister)
    const {error, loading, userInfo} = userRegister

    useEffect(() =>{
        if(userInfo){
            history.push(redirect)
        }
    },[history, userInfo, redirect])

    function submitHandler(e)
    {
        e.preventDefault()

        if(password != confirmPassword)
        {
            setMessage('Passwords do not match!')
        }
        else{
            dispatch(register(name,email, password))
        }
    }

    return (
        <FormContainer>
            <h1>Register</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                       required
                       type="name"
                       placeholder="Enter name"
                       value={name}
                       onChange={(e) => setName(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                       required
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
                      required
                      type="password"
                       placeholder="Password"
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="PasswordConfirm">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      required
                      type="password"
                       placeholder="Confirm Password"
                       value={confirmPassword}
                       onChange={(e) => setConfirmPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Register
                </Button>
            </Form>

            <Row>
                <Col>
                    Already have an account? <Link to={`/login`}>Sign in</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterPage
