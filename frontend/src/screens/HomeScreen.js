import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listMovies } from "../actions/movieActions";

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;

  const dispatch = useDispatch();

  const movieList = useSelector((state) => state.movieList);
  const { loading, error, movies } = movieList;
  useEffect(() => {
    dispatch(listMovies(keyword));
  }, [dispatch, keyword]);

  return (
    <>
      <h1>Movies</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {movies.map((movie) => (
            <Col key={movie._id} sm={12} md={6} lg={4} xl={3}>
              <Product movie={movie} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
