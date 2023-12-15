import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Rating from "./Rating";

const Product = ({ movie }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/movies/${movie._id}`}>
        <Card.Img src={movie.image} variant="top" />
      </Link>

      <Card.Body>
        <Link to={`/movies/${movie._id}`}>
          <Card.Title as="div">
            <strong>{movie.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <Rating value={movie.rating} text={`${movie.numReviews} reviews`} />
        </Card.Text>

        <Card.Text as="h3">${movie.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
