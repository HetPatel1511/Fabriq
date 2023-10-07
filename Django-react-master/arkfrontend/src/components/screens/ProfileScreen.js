import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { useSelector } from 'react-redux'
import { ListGroup, Row, Col, Image, } from 'react-bootstrap';
// import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom'

function ProfileScreen({history}) {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const [data, setdata] = useState([])
  useEffect(() => {
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo?.token}`
      }
    }
      if(userInfo){
      axios.get(`/api/user/profile/${userInfo._id}`, config).then((res) => {
        if (res.data) {
          setdata(res.data.reverse());
        } else {
          setdata(null);
        }
      })
    }
    else{
      history.push('/')
    }
  }, [userInfo, history])
  return (<>
    {userInfo &&
    <>
      {/* {data && JSON.stringify(data)} */}
      <h1>Previous Orders</h1>
      <hr />
      <ListGroup variant='flush'>
        {data.map((items, index) => (
          <ListGroup.Item key={items._id}>
            <h2 className='mb-3'>Order-{index + 1}</h2>
            {items.orderItems.map((item) => {
              return (<>
                <Row className='mt-2'>
                  <Col md={1}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={5}>
                    <Link to={`/product/${item.product}`} style={{ textDecoration: 'none' }}>{item.name}</Link>
                  </Col>

                  <Col md={3}>
                    ₹{item.price}
                  </Col>

                  <Col md={3}>
                    {item.qty}
                  </Col>
                </Row>
              </>)
            })}
            <h3 className='mt-5'>Payment Method</h3>
            <h5>{items["paymentMethod"]}</h5>
            <Row>
              <Col lg={3} md={4} sm={6} xs={6}>
                Sub Total :<br />
                Shipping Price :<br />
                Tax(12%) :<br />
                Total Amount :
              </Col>
              <Col lg={9} md={8} sm={6} xs={6}>
                ₹{items.orderItems.reduce((acc, item) => acc + parseInt(item.price) * parseInt(item.qty), 0)}<br />
                ₹{items["shippingPrice"]}<br />
                ₹{items["taxPrice"]}<br />
                ₹{items["totalPrice"]}
              </Col>
            </Row>

            <h3 className='mt-5'>Delivery Address</h3>
            <Row className='mb-4'>
              <Col lg={3} md={4} sm={6} xs={6}>
                Address :<br />
                City :<br />
                Country :<br />
                postalCode :
              </Col>
              <Col lg={9} md={8} sm={6} xs={6}>
                {items["shippingAddress"]["address"]}<br />
                {items["shippingAddress"]["city"]}<br />
                {items["shippingAddress"]["country"]}<br />
                {items["shippingAddress"]["postalCode"]}
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>}</>)
}

export default ProfileScreen
