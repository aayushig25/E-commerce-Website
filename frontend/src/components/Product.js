import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
import { Link } from "react-router-dom";
import Image from 'react-bootstrap/Image'

function Product({ product }) {
    return (
        <Card className="m-2 p-3">
          <Link to={`/product/${product._id}`}>
              <Image src={product.image}/> 
          </Link>
          <Card.Body>
              <Link to={`/product/${product._id}`}>
                 <Card.Title>{product.name}</Card.Title>
              </Link>
              <Card.Text>
                 
                  <Rating value={product.rating} reviews={`${product.numReviews} reviews` } color="#ffce67"/>
              </Card.Text>

              <Card.Text>${product.price}</Card.Text>
          </Card.Body>
        </Card>
    )
}


export default Product
