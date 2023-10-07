import React from "react";
import { Card } from "react-bootstrap";
import Rating from "../components/Rating";
import {Link} from "react-router-dom"

function Product({ product }) {
  return (
    <div className="pt-3">
    <Card className="my-3 p-3 rounded" style={{height:'490px'}}>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image}/>
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`} style={{textDecoration:'none'}}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
            <div className="my-3">
                {product.rating} from {product.numReviews} reviews
            </div>
        </Card.Text>
        
        <Card.Text as="h3">
          ₹{product.price}
        </Card.Text>

        <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
                color={"#f8e825"}
              />
      </Card.Body>
    </Card>
    </div>
  );
}

export default Product;
