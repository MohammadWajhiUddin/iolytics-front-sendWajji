import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, CardBody, Card, Container, Input, Form } from "reactstrap";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "Slices/UserAuthenticateSlice";

import { useNavigate } from "react-router-dom"; // Import useNavigate


const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

 



  document.title = "Login ";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const Credentials = useSelector((state) => state.authenticateUser.user);
  const loginStatus = useSelector((state) => state.authenticateUser.status);
  const loginError = useSelector((state) => state.authenticateUser.error);


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    const users = {
      username: email,
      password: password,
    };

    dispatch(loginUser(users));

 
  };

  return (
    <React.Fragment>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <CardBody className="pt-0">
                  <h3 className="text-center mt-5 mb-4">
                    {/* <Link to="/" className="d-block auth-logo">
                      <img src={logoDark} alt="" height="30" className="auth-logo-dark" />
                      <img src={logoLightPng} alt="" height="30" className="auth-logo-light" />
                    </Link> */}
                  </h3>
                  <div className="p-3">
                    <h4 className="text-muted font-size-18 mb-1 text-center">Welcome Back !</h4>
                    <p className="text-muted text-center">Sign in to continue to IOLYTICS.</p>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <Form className="form-horizontal mt-4" onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <Input
                          name="email"
                          label="Email"
                          value={email}
                          className="form-control"
                          placeholder="Enter email"
                          type="email"
                          required
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>

                      <div className="mb-3">
                        <Input
                          name="password"
                          label="Password"
                          value={password}
                          type="password"
                          required
                          placeholder="Enter Password"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>

                      <div className="mb-3 row mt-4">
                        <div className="col-6">
                          {/* <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="customControlInline"
                            />
                          </div> */}
                        </div>
                        <div className="col-6 text-end">
                          <button className="btn btn-primary w-md waves-effect waves-light" type="submit">
                            Log In
                          </button>
                        </div>
                      </div>
                      <div className="form-group mb-0 row">
                        <div className="col-12 mt-4">
                          <Link to="/page-recoverpw" className="text-muted">
                            <i className="mdi mdi-lock"></i> Forgot your password?
                          </Link>
                        </div>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Don&#39;t have an account ?{" "}
                  <Link to="/pages-register" className="text-primary">
                    {" "}
                    Signup now{" "}
                  </Link>{" "}
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Login;
