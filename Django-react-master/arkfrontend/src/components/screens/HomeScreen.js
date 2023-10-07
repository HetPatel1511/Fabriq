// import React, {useEffect, useState} from 'react';
// import { useDispatch,useSelector } from 'react-redux';
// import {Row,Col} from "react-bootstrap";
// import Product from '../Product';
// import { listProducts } from '../../actions/productAction';
// import Loader from '../Loader';
// import Message from '../Message';
// import CarouselContainer from '../CarouselContainer';

// function HomeScreen() {
//     const dispatch = useDispatch();
//     const [search, setSearch] = useState('')
//     const productList = useSelector((state)=>state.productList);
//     const {error,loading,products} =productList
//     useEffect(()=>{
//         dispatch(listProducts());
//     },[dispatch])

//     return (
//         <div>
//         <CarouselContainer/>
//             <h1 className="text-center">Latest Products</h1>
//             {loading ?(
//                 <Loader />
//             ):error ?(
//               <Message variant='danger'>{error}</Message>
//             ):
//             <Row className='mb-5 mt-3'>
//                {products.map((product)=>(
//                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
//                        <Product  product={product}/>
//                    </Col>
//                ))}
//             </Row>
//             }
//         </div>
//     )
// }

// export default HomeScreen



import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Form } from 'react-bootstrap';
import Product from '../Product';
import { listProducts } from '../../actions/productAction';
import Loader from '../Loader';
import Message from '../Message';
import CarouselContainer from '../CarouselContainer';

function HomeScreen() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const productList = useSelector((state) => state.productList);
  const { error, loading, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  // Filter products based on the search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <CarouselContainer />
      <div className="text-center">
        <h1>Latest Products</h1>
        <Form.Group controlId="search">
          <Form.Control
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Form.Group>
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className='mt-3'>
        {filteredProducts.length === 0 ? (
            <Message variant="info">No products found.</Message>
          ) : (
        <Row className="mb-5">
          {filteredProducts.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>)}
        </div>
      )}
    </div>
  );
}

export default HomeScreen;
