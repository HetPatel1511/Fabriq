import React from 'react';
import { ListGroup, Col, Row, Image } from "react-bootstrap";
import { useSelector } from 'react-redux';
import Message from '../Message'

function OrderplacedScreen() {
    const cart = useSelector(state => state.cart)
    const { cartItems } = cart
    // const address = JSON.parse(localStorage.getItem('fullAddress'))

    return (
        <div>
            <Message variant={'success'}>Order Placed Successfully</Message>
        <h2>Ordered Items</h2>
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
            <Row>
                <Col md={8}>
                </Col>
                <Col md={4}>
                    <strong>
                        Total Amount Paid :
                        ₹{cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                    </strong>
                </Col>
            </Row>
        <hr></hr>
        </div >
    )
}

export default OrderplacedScreen