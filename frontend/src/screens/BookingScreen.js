import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";

import { saveBooking } from "../actions/cartActions";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
const BookingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { bookingData, cartItems } = cart;

  const [location, setLocation] = useState(bookingData.location);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveBooking({ location }));
    history.push("/payment");
  };

  const handleChange = (e) => {
    setLocation(e.target.value);
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />

      <Form onSubmit={submitHandler}>
        <select value={location} onChange={handleChange} className="select">
          <option value="Liberty">Liberty</option>
          <option value="Savoy">Savoy</option>
          <option value="Majestic">Majestic</option>
        </select>

        <Button type="submit" varient="primary">
          Continue
        </Button>
      </Form>
      <h2>Total seats({cartItems.reduce((acc, item) => acc + item.qty, 0)})</h2>
    </FormContainer>
  );
};

export default BookingScreen;
