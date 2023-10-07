import React, { useState, useEffect } from 'react'
import emailjs from 'emailjs-com';
import { Form, Col, Row, ListGroup, Image, Button } from "react-bootstrap";
import FormContainer from '../FormContainer';
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Loader';
import { saveShippingAddress, savePaymentMethod } from '../../actions/cartActions';
import { CART_CLEAR_ITEMS } from '../../constants/cartConstants'
import { PayPalButton } from 'react-paypal-button-v2'
import { createOrder } from '../../actions/orderActions';
import { ORDER_CREATE_RESET } from '../../constants/orderConstatnts'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

function Shippingscreen({history}) {
    const orderCreate = useSelector(state => state.orderCreate)
    const {order, success} = orderCreate
    const [sdkReady, setSdkReady] = useState(false)
    const cart = useSelector(state => state.cart)
    const { cartItems } = cart
    const dispatch = useDispatch()
    const [address, setAddress] = useState('')
    const [country, setCountry] = useState('')
    const [city, setCity] = useState('')
    const [pincode, setPincode] = useState('')
    const [paymentMethod, setPaymentMethod] = useState('')

    cart.itemsPrice = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)
    cart.taxPrice = (cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)*0.12).toFixed(2)
    cart.shippingPrice = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)>1000?0:80
    cart.totalPrice = Number(cart.itemsPrice) + Number(cart.taxPrice) + Number(cart.shippingPrice)

    const addPayPalScript = () => {
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = 'https://www.paypal.com/sdk/js?client-id=AfRHaP6G8Cf10KYGTuCopdPbCg1F8aiBAS040dgvTDzAaBPyART33IsvUT95ABM0Jev9fb80n8tRWnO_'
        script.async = true
        script.onload = () => {
            setSdkReady(true)
        }
        document.body.appendChild(script)
    }

    let subjectcontent=`HI ${order?.user.name.toUpperCase()} YOUR ORDER IS SUCCESSFULLY PLACED!!`
    let messagecontent=""
    messagecontent+="YOUR ORDER DETAILS:\n"
    const sendmessage=async ()=>{order && 
        order.orderItems.map((i)=>{
 
            messagecontent=messagecontent+i.name.toString()+"\n";
            
            return messagecontent;}
            )}
            sendmessage()
            

    useEffect(() => {
        if (!window.paypal) {
            addPayPalScript()
        } else {
            setSdkReady(true)
        }
        if(success){
            messagecontent+="TOTAL PRICE: ₹"+order?.totalPrice+"\n";
            const serviceId = 'service_z0o9mri';
            const templateId = 'template_kcrve39';
            const userId = 'fanwsg7p9eLIHro97';
            const emailParams = {
                to_email: `${order?.user.email}`,
                subject: `${subjectcontent}`,
                message: `${messagecontent}`,
                to_name:`${order?.user.name}`,
              };
              emailjs.send(serviceId, templateId, emailParams, userId)
              .then((response) => {
                console.log('Email sent successfully:', response);
                messagecontent="";
              })
              .catch((error) => {
                console.error('Email sending failed:', error);
              });
            
            toast.success("ORDER PLACED SUCCESSFULLY.",{autoClose:5000})
            setTimeout(()=>{
            dispatch({ type: CART_CLEAR_ITEMS })
            localStorage.removeItem("cartItems")
            dispatch({ type: ORDER_CREATE_RESET })
            history.push("/")
            },5000)
        }
    }, [sdkReady, history, success,order]);

    async function successPaymentHandler() {
        await dispatch(saveShippingAddress({ address:address, city:city, country:country, postalCode:pincode }))
        await dispatch(savePaymentMethod(paymentMethod))
        await dispatch(createOrder({orderItems:cart.cartItems,
            shippingAddress:{ address:address, city:city, country:country, postalCode:pincode },
            paymentMethod:paymentMethod,
            itemsPrice:Number(cart.itemsPrice),
            shippingPrice:Number(cart.shippingPrice),
            taxPrice:Number(cart.taxPrice),
            totalPrice:Number(cart.totalPrice)
        }))
    }

    const submitHandler =async (e) => {
        e.preventDefault()
        await dispatch(saveShippingAddress({ address:address, city:city, country:country, postalCode:pincode }))
        await dispatch(savePaymentMethod(paymentMethod))
        await dispatch(createOrder({orderItems:cart.cartItems,
            shippingAddress:{ address:address, city:city, country:country, postalCode:pincode },
            paymentMethod:paymentMethod,
            itemsPrice:Number(cart.itemsPrice),
            shippingPrice:Number(cart.shippingPrice),
            taxPrice:Number(cart.taxPrice),
            totalPrice:Number(cart.totalPrice),
        }))
    }
    return (
        <div>
            <ToastContainer className="toastcontainer" style={{width:"300px",height:"8px"}}/>
            <h2>Order Items</h2>
            <hr></hr>
            <ListGroup variant='flush'>
                {cartItems.map(item => (
                    <ListGroup.Item key={item.product}>
                        <Row>
                            <Col md={1}>
                                <Image src={item.image} alt={item.name} fluid rounded />
                            </Col>
                            <Col md={7}>
                                {item.name}
                            </Col>

                            <Col md={4}>
                                ₹{item.price} X {item.qty} = ₹{item.price * item.qty}
                            </Col>
                        </Row>
                    </ListGroup.Item>
                ))}
            </ListGroup>
            <hr></hr>
            <Row>
                <Col lg={8} md={6} sm={6} xs={6}>
                    Total price :
                </Col>
                <Col lg={4} md={6} sm={6} xs={6}>
                    ₹{cart.itemsPrice}
                </Col>
            </Row>

            <Row>
                <Col lg={8} md={6} sm={6} xs={6}>
                    Tax(12%) :
                </Col>
                <Col lg={4} md={6} sm={6} xs={6}>
                    ₹{cart.taxPrice}
                </Col>
            </Row>
            <Row>
                <Col lg={8} md={6} sm={6} xs={6}>
                    Delivery Charge :
                </Col>
                <Col lg={4} md={6} sm={6} xs={6}>
                    ₹{cart.shippingPrice}
                </Col>
            </Row>
            <Row>
                <Col lg={8} md={6} sm={6} xs={6}>
                    Total amount to be paid :
                </Col>
                <Col lg={4} md={6} sm={6} xs={6}>
                    ₹{cart.totalPrice}
                </Col>
            </Row>
            <hr></hr>
            <h1>Enter your address</h1>
            <hr></hr>
            <FormContainer>
                    <Form.Group controlId='address'>
                        <Form.Label>Address</Form.Label>
                        <Form.Control required type='text' placeholder='Address' value={address ? address : ''} onChange={(e) => setAddress(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='area'>
                        <Form.Label>City</Form.Label>
                        <Form.Control required type='text' placeholder='City' value={city ? city : ''} onChange={(e) => setCity(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='country'>
                        <Form.Label>Country</Form.Label>
                        <Form.Control required type='text' placeholder='Country' value={country ? country : ''} onChange={(e) => setCountry(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='pincode'>
                        <Form.Label>Postal Code</Form.Label>
                        <Form.Control required type='number' placeholder='Postal Code' value={pincode ? pincode : ''} onChange={(e) => setPincode(e.target.value)}></Form.Control>
                    </Form.Group>
            </FormContainer>
            <hr></hr>
            <h1>select payment method</h1>
            <hr></hr>
            <FormContainer>
            <Form onSubmit={submitHandler}>
                    <Form.Group>
                        <Form.Check type='radio' name='paymentMethod' value='Cash On Delivery' label='Cash On Delivery' onChange={(e)=>setPaymentMethod('Cash On Delivery')}/>
                        <Form.Check type='radio' name='paymentMethod' value='PayPal' label='PayPal' onChange={(e)=>setPaymentMethod('PayPal')} />
                    </Form.Group>
                    

                    <Row className="mt-4" style={{ justifyContent: 'center' }}>
                        <Col md={5}>
                            {!sdkReady ? (
                                <Loader />
                            ) : (address && city && country && pincode && paymentMethod==='PayPal'?
                                <PayPalButton
                                    amount={parseFloat(cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)) + parseFloat(cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)) * 0.3}
                                    onSuccess={successPaymentHandler} />:
                                    address && city && country && pincode && paymentMethod==='Cash On Delivery' &&
                                <Button type='submit'>Place Order</Button>
                            )}
                        </Col>
                    </Row>
                </Form>
            </FormContainer >
        </div >
    )
}

export default Shippingscreen
