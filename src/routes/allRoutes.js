import React from "react"
import { Navigate } from "react-router-dom"

// Profile
import UserProfile from "../pages/Authentication/user-profile"

// Pages Calendar
import Calendar from "../pages/Calendar/index"

//Email
import EmailInbox from "../pages/Email/email-inbox"
import EmailRead from "../pages/Email/email-read"
import EmailCompose from "../pages/Email/email-compose"

// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import Register from "../pages/Authentication/Register"
import ForgetPwd from "../pages/Authentication/ForgetPassword"

// Inner Authentication
import Login1 from "../pages/AuthenticationInner/Login"
import Register1 from "../pages/AuthenticationInner/Register"
import Recoverpw from "../pages/AuthenticationInner/Recoverpw"
import LockScreen from "../pages/AuthenticationInner/auth-lock-screen"

// Dashboard
import Dashboard from "../pages/Dashboard/index"

//Charts
import ChartsAppex from "../pages/Charts/charts-appex"
import ChartsJs from "../pages/Charts/charts-chartjs"
import ChartsKnob from "../pages/Charts/charts-knob"
import ChartsC3 from "../pages/Charts/charts-c3"
import ChartsSparkLine from "../pages/Charts/charts-sparkline"

// Maps
import MapsGoogle from "../pages/Maps/MapsGoogle"
import MapsVector from "../pages/Maps/MapsVector"

//Icons
import IconMaterialdesign from "../pages/Icons/IconMaterialdesign"
import Iconion from "../pages/Icons/Iconion"
import IconFontawesome from "../pages/Icons/IconFontawesome"
import IconThemify from "../pages/Icons/IconThemify"
import IconDripicons from "../pages/Icons/IconDripicons"
import IconTypicons from "../pages/Icons/IconTypicons"

//Tables
import BasicTables from "../pages/Tables/BasicTables"
import DatatableTables from "../pages/Tables/DatatableTables"
import ResponsiveTables from "../pages/Tables/ResponsiveTables"
import EditableTables from "../pages/Tables/EditableTables"

// Forms
import FormElements from "../pages/Forms/FormElements"
import FormAdvanced from "../pages/Forms/FormAdvanced"
import FormEditors from "../pages/Forms/FormEditors"
import FormValidations from "../pages/Forms/FormValidations"
import FormUpload from "../pages/Forms/FormUpload"
import FormXeditable from "../pages/Forms/FormXeditable"

//Ui
import UiAlert from "../pages/Ui/UiAlert"
import UiButtons from "../pages/Ui/UiButtons"
import UiBadge from "../pages/Ui/UiBadge"
import UiCards from "../pages/Ui/UiCards"
import UiCarousel from "../pages/Ui/UiCarousel"
import UiDropdown from "../pages/Ui/UiDropdown"
import UiGrid from "../pages/Ui/UiGrid"
import UiImages from "../pages/Ui/UiImages"
import UiLightbox from "../pages/Ui/UiLightbox"
import UiModal from "../pages/Ui/UiModal"
import UiPagination from "../pages/Ui/UiPagination"
import UiPopoverTooltips from "../pages/Ui/UiPopoverTooltips"
import UiProgressbar from "../pages/Ui/UiProgressbar"
import UiTabsAccordions from "../pages/Ui/UiTabsAccordions"
import UiTypography from "../pages/Ui/UiTypography"
import UiVideo from "../pages/Ui/UiVideo"
import UiSessionTimeout from "../pages/Ui/UiSessionTimeout"
import UiRangeSlider from "../pages/Ui/UiRangeSlider"

//Extra Pages
import PagesTimeline from "../pages/Extra Pages/pages-timeline"
import PagesInvoice from "../pages/Extra Pages/pages-invoice"
import PagesDirectory from "../pages/Extra Pages/pages-directory"
import PagesBlank from "../pages/Extra Pages/pages-blank"
import Pages404 from "../pages/Extra Pages/pages-404"
import Pages500 from "../pages/Extra Pages/pages-500"
import UiUtilities from "pages/Ui/UiUtilities"
import UiColors from "pages/Ui/UiColors"
import UiOffcanvas from "pages/Ui/UiOffcanvas"
import Chat from "pages/Chat/Chat"
import Kanban from "pages/Kanban"
import Machines from "pages/Machines/Machine"
import SingleMachine from "pages/SingleMachine/SingleMachine"

import AddClient from "pages/Clients/AddClient"
import ViewAllClients from "pages/Clients/ViewAllClients"
import SingleClientDetail from "pages/Clients/SingleClientDetail"
import UpdateClientForm from "pages/Clients/UpdateClientForm"

import DeviceLocation from "pages/Location/DeviceLocation"
import AddDeviceLocation from "pages/Location/AddDeviceLocation"
import ViewLocationDetails from "pages/Location/ViewLocationDetails"
import UpdateDeviceLocation from "pages/Location/UpdateDeviceLocation"
import AddDevices from "pages/Devices/AddDevice"

import AddCategory from "pages/Devices/AddCategory"
import ViewCategories from "pages/Devices/ViewCategories"
import ViewSingleCategories from "pages/Devices/ViewSingleCategory"
import UpdateCategory from "pages/Devices/UpdateCategory"

import ViewDevices from "pages/Devices/ViewDevices"
import TempConfiguration from "pages/Devices/TempConfiguration"


const userRoutes = [
  { path: "/dashboard", component: <Dashboard /> },
  { path: "/AddClient", component: <AddClient /> },
  { path: "/ViewAllClients", component: <ViewAllClients /> },
  {
    path: "/SingleClientDetail/:client_id/:user_id",
    component: <SingleClientDetail />,
  },
  {
    path: "/UpdateClientForm/:client_id/:user_id",
    component: <UpdateClientForm />,
  },

  {
    path: "/DeviceLocation/:client_id/:user_id",
    component: <DeviceLocation />,
  },
  {
    path: "/AddDeviceLocation/:client_id/:user_id",
    component: <AddDeviceLocation />,
  },
  { path: "/ViewLocationDetails", component: <ViewLocationDetails /> },
  { path: "/UpdateDeviceLocation/:client_id/:user_id/:location_id",component: <UpdateDeviceLocation />, },
  { path: "/AddCategory", component: <AddCategory /> },
  { path: "/ViewCategories", component: <ViewCategories /> },
  { path: "/ViewSingleCategories", component: <ViewSingleCategories /> },
  { path: "/UpdateCategory", component: <UpdateCategory /> },


  { path: "/AddDevices", component: <AddDevices /> },
  { path: "/ViewDevices", component: <ViewDevices /> },


  { path: "/TempConfiguration/:device_id/:user_id", component: <TempConfiguration /> },


  // this route should be at the end of all other routes
  {
    path: "/",
    exact: true,
    component: <Navigate to="/login" />,
  },
]

const authRoutes = [{ path: "/login", component: <Login /> },
  
]

export { userRoutes, authRoutes }