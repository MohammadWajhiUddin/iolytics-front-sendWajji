import React from "react"
import { Route, Routes, Link,NavLink, Navigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { logout } from "./Slices/UserAuthenticateSlice" // Adjust the path as needed
import { userRoutes, authRoutes } from "./routes/allRoutes" // Make sure the import path is correct
import SimpleBar from "simplebar-react"
import "./assets/scss/theme.scss"

// Header Component
const Header1 = () => {
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div
      style={{
        backgroundColor: "#1F1F1F",
        padding: "10px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div style={{ color: "#E0E0E0", fontSize: "1.5rem" }}>My App</div>
      <div>
        <Link to="/login" style={{ color: "#E0E0E0" }} onClick={handleLogout}>
          LogOut
        </Link>
      </div>
    </div>
  )
}

// Sidebar Component
const Sidebar = () => (
  <SimpleBar
    style={{
      height: "100%",
      width: 200,
      backgroundColor: "#2C2C2C",
    }}
  >
    <div id="sidebar-menu">
      <ul className="metismenu list-unstyled" id="side-menu">
        <li
          className="menu-title"
          style={{ color: "#E0E0E0", fontSize: "1.3rem" }}
        >
          Temp Insight
        </li>
        <li>
          <ul className="sub-menu" style={{ backgroundColor: "#383838" }}>
            <li>
              <NavLink
                to="/ViewAllClients"
                style={({ isActive }) => ({
                  color: isActive ? "#FFD700" : "#E0E0E0",
                })}
              >
                <i className="mdi mdi-account" style={{ color: "inherit" }}></i>
                Clients
              </NavLink>
            </li>
          </ul>
        </li>
        <li>
          <ul className="sub-menu" style={{ backgroundColor: "#383838" }}>
            <li>
              <NavLink
                to="/ViewCategories"
                className="waves-effect"
                style={({ isActive }) => ({
                  color: isActive ? "#FFD700" : "#E0E0E0",
                })}
              >
                <i
                  className="mdi mdi-washing-machine"
                  style={{ color: "inherit" }}
                ></i>
                Categories
              </NavLink>
            </li>
          </ul>
        </li>
        <li>
          <ul className="sub-menu" style={{ backgroundColor: "#383838" }}>
            <li>
              <NavLink
                to="/ViewDevices"
                className="waves-effect"
                style={({ isActive }) => ({
                  color: isActive ? "#FFD700" : "#E0E0E0",
                })}
              >
                <i
                  className="mdi mdi-washing-machine"
                  style={{ color: "inherit" }}
                ></i>
                Devices
              </NavLink>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </SimpleBar>
)


// App Component
const App = () => {
  const isAuthenticated = useSelector(
    state => state.authenticateUser.isAuthenticated,
  )

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {isAuthenticated && <Sidebar />}

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {isAuthenticated && <Header1 />}

        <div style={{ flex: 1, padding: "15px" }}>
          <Routes>
            {isAuthenticated
              ? userRoutes.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    element={route.component}
                  />
                ))
              : authRoutes.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    element={route.component}
                  />
                ))}
            <Route
              path="*"
              element={
                <Navigate to={isAuthenticated ? "/dashboard" : "/login"} />
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App