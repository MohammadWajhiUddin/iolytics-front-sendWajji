import React, { useState } from "react";
import { Route, Routes, Link, Navigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "./Slices/UserAuthenticateSlice";
import { userRoutes, authRoutes } from "./routes/allRoutes";
import { Container, Navbar, NavbarBrand, Nav, NavItem, NavLink, Button, Col } from "reactstrap";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import "./App.css";

// Header Component
const Header1 = ({ toggleSidebar }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Navbar color="dark" dark expand="md" className="d-flex justify-content-between p-3">
      {/* Left Section: Hamburger Menu and App Name */}
      <div className="d-flex align-items-center">
        {/* Only show hamburger menu on mobile screens */}
        <Button color="light" className="d-md-none me-3" onClick={toggleSidebar}>
          <i className="mdi mdi-menu" style={{ fontSize: "1.5rem" }}></i>
        </Button>
        <NavbarBrand tag={Link} to="/" className="text-light" style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
          Temp Insight
        </NavbarBrand>
      </div>

      {/* Right Section: Logout Button */}
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink
            tag={Link}
            to="/login"
            onClick={handleLogout}
            className="text-light"
            style={{ fontSize: "1.1rem", fontWeight: "500", padding: "0.5rem 1rem", borderRadius: "5px", backgroundColor: "#ff4d4f" }}
          >
            <i className="mdi mdi-logout" style={{ marginRight: "5px" }}></i>
            Log Out
          </NavLink>
        </NavItem>
      </Nav>
    </Navbar>
  );
};


const Sidebar = ({ isOpen, toggleSidebar }) => (
  <div
    className={`sidebar d-flex flex-column justify-content-between ${isOpen ? "open" : ""}`}
    style={{ backgroundColor: "#333", color: "#E0E0E0", minWidth: "200px" }}
  >
    <Button
      color="light"
      className="d-md-none mb-3 align-self-end"
      onClick={toggleSidebar}
      style={{ marginRight: "20px" }}
    >
      <i className="mdi mdi-close"></i>
    </Button>

    <SimpleBar style={{ height: "100%" }}>
      <ul className="list-unstyled">
        <li
          className="menu-title text-center mb-4"
          style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#fff" }}
        >
          Temp Insight
        </li>

        <li className="text-center mb-4">
          <NavLink
            tag={Link}
            to="/ViewAllClients"
            className="text-light d-flex align-items-center justify-content-center"
            style={{ fontSize: "1.2rem" }}
          >
            <i className="mdi mdi-account-circle-outline mr-2" style={{ fontSize: "1.5rem" }}></i>
            Clients
          </NavLink>
        </li>

        <li className="text-center mb-4">
          <NavLink
            tag={Link}
            to="/ViewCategories"
            className="text-light d-flex align-items-center justify-content-center"
            style={{ fontSize: "1.2rem" }}
          >
            <i className="mdi mdi-shape-outline mr-2" style={{ fontSize: "1.5rem" }}></i>
            Categories
          </NavLink>
        </li>

        <li className="text-center mb-4">
          <NavLink
            tag={Link}
            to="/ViewDevices"
            className="text-light d-flex align-items-center justify-content-center"
            style={{ fontSize: "1.2rem" }}
          >
            <i className="mdi mdi-devices mr-2" style={{ fontSize: "1.5rem" }}></i>
            Devices
          </NavLink>
        </li>
      </ul>
    </SimpleBar>
  </div>
);


// App Component
const App = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const isAuthenticated = useSelector(state => state.authenticateUser.isAuthenticated);
  const location = useLocation(); // To get the current path

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <Container fluid className="app-container">
      {isAuthenticated && (
        <>
          {/* Sidebar */}
          <div className={`sidebar-container ${isSidebarOpen ? "open" : ""}`}>
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          </div>

          {/* Overlay for mobile when sidebar is open */}
          {isSidebarOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}
        </>
      )}

      {/* Content Area */}
      <Col className={`content-area ${isAuthenticated ? "with-sidebar" : ""}`}>
        {/* Conditionally render Header1 only if not on login page and user is authenticated */}
        {isAuthenticated && location.pathname !== "/login" && (
          <Header1 toggleSidebar={toggleSidebar} />
        )}
        <div className="main-content">
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
