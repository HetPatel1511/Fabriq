import React,
{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import Message from "../Message";
import Loader from "../Loader";
import { Row, Col, Form, Button} from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import { register } from '../../actions/userActions'
import FormContainer from '../FormContainer'


function RegisterScreen({location, history}) {
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [confirmPassword,setConfirmPassword]=useState('')
    const [message,setMessage]=useState('')
    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1] :'/'
 
    const userRegister = useSelector(state=>state.userRegister)
    const {error,loading,userInfo}=userRegister

    useEffect(()=>{
        if(userInfo){
            history.push(redirect)
        }
    },[history,userInfo,redirect])


    const submitHandler= (e)=>{
        e.preventDefault()
        if(password.length<8){
            setMessage('Password must have minimum 8 characters')
        }
        else if(password!==confirmPassword){
          setMessage('Password do not Match')
        }
        else{
          setMessage('')
          dispatch(register(name,email,password))

        }
       
    }
    return (
        <div>
             <FormContainer>
          <h1>Sign Up</h1>
          {message && <Message variant='danger'>{message}</Message>}
          {error && <Message variant='danger'>{"This email is already registered"}</Message>}
          {loading && <Loader />}

          <Form onSubmit={submitHandler}>


              <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control type='name' placeholder='Enter Name' value={name} onChange={(e)=> setName(e.target.value)} required></Form.Control>
              </Form.Group>

              <Form.Group controlId='email'>
                <Form.Label>Email Address </Form.Label>
                <Form.Control required type='email' placeholder='Enter Email' value={email} onChange={(e)=> setEmail(e.target.value)}></Form.Control>
              </Form.Group>

              <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control required type='password' placeholder='Enter Password' value={password} onChange={(e)=> setPassword(e.target.value)}></Form.Control>
              </Form.Group>

              <Form.Group controlId='confirmPassword'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control required type='password' placeholder='Confirm Password' value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)}></Form.Control>
              </Form.Group>

            <Button className='mt-3' type='submit' variant='success'>Register</Button>

          </Form>

          <Row className='py-3'>
              <Col>
              Already User? 
              <Link to={redirect?`/login?redirect=${redirect}`:'/login'}>Sign In</Link>
              </Col>

          </Row>

         </FormContainer>
            
        </div>
    )
}

export default RegisterScreen
