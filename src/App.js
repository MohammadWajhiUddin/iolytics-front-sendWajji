import React from "react";
import { Route, Routes, Link, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "./Slices/UserAuthenticateSlice";
import { userRoutes, authRoutes } from "./routes/allRoutes";
import { Container, Navbar, NavbarBrand, Nav, NavItem, NavLink, Row, Col } from "reactstrap";
import SimpleBar from "simplebar-react";
import "./assets/scss/theme.scss";

// Header Component
const Header1 = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Navbar color="dark" dark expand="md">
      <NavbarBrand tag={Link} to="/">My App</NavbarBrand>
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink tag={Link} to="/login" onClick={handleLogout}>LogOut</NavLink>
        </NavItem>
      </Nav>
    </Navbar>
  );
};

// Sidebar Component
const Sidebar = () => (
  <SimpleBar style={{ height: "100%", width: 200, backgroundColor: "#343a40" }}>
    <div id="sidebar-menu">
      <ul className="list-unstyled">
        <li className="menu-title" style={{ color: "#E0E0E0", fontSize: "1.3rem" }}>
          Temp Insight
        </li>
        <li>
          <NavLink tag={Link} to="/ViewAllClients" className="text-light">
            <i className="mdi mdi-account"></i> Clients
          </NavLink>
        </li>
        <li>
          <NavLink tag={Link} to="/ViewCategories" className="text-light">
            <i className="mdi mdi-washing-machine"></i> Categories
          </NavLink>
        </li>
        <li>
          <NavLink tag={Link} to="/ViewDevices" className="text-light">
            <i className="mdi mdi-washing-machine"></i> Devices
          </NavLink>
        </li>
      </ul>
    </div>
  </SimpleBar>
);

// App Component
const App = () => {
  const isAuthenticated = useSelector(state => state.authenticateUser.isAuthenticated);

  return (
    <Container fluid style={{ display: "flex", height: "100vh" }}>
      {isAuthenticated && (
        <Col xs="3" style={{ backgroundColor: "#343a40", padding: 0 }}>
          <Sidebar />
        </Col>
      )}

      <Col xs={isAuthenticated ? "9" : "12"} style={{ padding: 0 }}>
        <Header1 />
        <div style={{ flex: 1, padding: "15px" }}>
          <Routes>
            {isAuthenticated
              ? userRoutes.map((route, index) => (
                  <Route key={index} path={route.path} element={route.component} />
                ))
              : authRoutes.map((route, index) => (
                  <Route key={index} path={route.path} element={route.component} />
                ))}
            <Route
              path="*"
              element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />}
            />
          </Routes>
        </div>
      </Col>
    </Container>
  );
};

export default App;
