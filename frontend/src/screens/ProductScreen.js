import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Image, ListGroup, Button, Form } from "react-bootstrap";
import { listMovieDetails } from "../actions/movieActions";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();

  const movieDetails = useSelector((state) => state.movieDetails);
  const { loading, error, movie } = movieDetails;
  useEffect(() => {
    dispatch(listMovieDetails(match.params.id));
  }, [dispatch, match]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={movie.image} alt={movie.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>{movie.name}</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={movie.rating}
                  text={`${movie.numReviews} reviews`}
                />
              </ListGroup.Item>

              <ListGroup.Item>Description:{movie.description}</ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Ticket Price:</Col>
                  <Col>
                    <strong>${movie.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Seat availability</Col>
                  <Col>{movie.countInStock > 0 ? "Avilable" : "Seat Full"}</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
            {movie.countInStock > 0 && (
              <ListGroup.Item>
                <Row>
                  <Col>Number of Tikets</Col>
                  <Col>
                    <Form.Control
                      as="select"
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                    >
                      {[...Array(movie.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                </Row>
              </ListGroup.Item>
            )}

            <ListGroup.Item>
              <Button
                onClick={addToCartHandler}
                className="btn-block"
                type="button"
                disabled={movie.countInStock === 0}
              >
                Book
              </Button>
            </ListGroup.Item>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductScreen;
