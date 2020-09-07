import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

const ContactForm = () => {
  const [state, setState] = useState({
    name: "",
    email: "",
    phoneno: "",
  });

  const [result, setResult] = useState(null);

  const sendEmail = (event) => {
    event.preventDefault();
    axios
      .post("/send", { ...state })
      .then((response) => {
        setResult(response.data);
        setState({ name: "", email: "", phoneno: "" });
      })
      .catch(() => {
        setResult({
          success: false,
          message: "Something went wrong. Try again later contact",
        });
      });
  };

  const onInputChange = (event) => {
    const { name, value } = event.target;
    console.log(event.target);
    setState({
      ...state,
      [name]: value,
    });
  };

  return (
    <div>
      {result && (
        <p className={`${result.success ? "success" : "error"}`}>
          {result.message}
        </p>
      )}
      <h1>Sign up</h1>
      <Form onSubmit={sendEmail}>
        <Form.Group controlId="name">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={state.name}
            placeholder="Enter Your Name"
            onChange={onInputChange}
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={state.email}
            placeholder="Enter Your Email"
            onChange={onInputChange}
          />
        </Form.Group>
        <Form.Group controlId="phoneno">
          <Form.Label>Phone No</Form.Label>
          <Form.Control
            type="number"
            name="phoneno"
            value={state.phoneno}
            placeholder="Enter Your Phone No"
            onChange={onInputChange}
          />
        </Form.Group>
        {/* <Form.Group controlId="message">
          <Form.Label>Message</Form.Label>
          <Form.Control
            type="text"
            name="message"
            value={state.message}
            placeholder="Enter Your Message"
            onChange={onInputChange}
          />
        </Form.Group> */}
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default ContactForm;
