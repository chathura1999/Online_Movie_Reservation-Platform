import React, { useEffect } from "react";
import { Table, Button, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listMovies, deleteMovie, createMovie } from "../actions/movieActions";
import { MOVIE_CREATE_RESET } from "../constants/movieConstants";

const BookingListScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  const movieList = useSelector((state) => state.movieList);
  const { loading, error, movies } = movieList;

  const movieDelete = useSelector((state) => state.movieDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = movieDelete;

  const movieCreate = useSelector((state) => state.movieCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    movie: createdMovie,
  } = movieCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: MOVIE_CREATE_RESET });

    if (!userInfo.isAdmin) {
      history.push("/login");
    }
    if (successCreate) {
      history.push(`/admin/movie/${createdMovie._id}/edit`);
    } else {
      dispatch(listMovies());
    }
  }, [dispatch, history, userInfo, successDelete, successCreate, createdMovie]);

  const deleteHandler = (id) => {
    if (window.confirm("Confirm")) {
      dispatch(deleteMovie(id));
    }
  };

  const createMovieHandler = () => {
    dispatch(createMovie());
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Movies</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createMovieHandler}>
            <i className="fas fa-plus"></i>
            Add Movie
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}

      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Movie Name</th>
              <th>Ticket Price</th>
              <th>Movie Category</th>
              <th>Studio</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie._id}>
                <td>{movie._id}</td>
                <td>{movie.name}</td>
                <td>{movie.price}</td>
                <td>{movie.category}</td>
                <td>{movie.brand}</td>
                <td>
                  <LinkContainer to={`/admin/movie/${movie._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(movie._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default BookingListScreen;
