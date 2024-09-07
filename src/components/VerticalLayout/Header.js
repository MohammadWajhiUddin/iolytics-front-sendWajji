import PropTypes from 'prop-types'
import React, { useState } from "react"
import { Link } from "react-router-dom"
import ProfileMenu from "../CommonForBoth/TopbarDropdown/ProfileMenu"
// import megamenuImg from "../../assets/images/megamenu-img.png"
import logo from "../../assets/images/logo-sm.png"
import logoDark from "../../assets/images/logo-dark.png"
//i18n
import { withTranslation } from "react-i18next"

const Header = ({ t }) => {
  const [search, setsearch] = useState(false)
  const [createmenu, setCreateMenu] = useState(false)

  function toggleFullscreen() {
    if (
      !document.fullscreenElement &&
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement
    ) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen()
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen()
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen()
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen()
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen()
      }
    }
  }

  function tToggle() {
    var body = document.body;
    body.classList.toggle("vertical-collpsed");
    body.classList.toggle("sidebar-enable");
  }

  return (
    <React.Fragment>
      <header id="page-topbar">
        <div className="navbar-header">
          <div className="d-flex">
            <div className="navbar-brand-box">
              <Link to="/" className="logo logo-dark">
                {/* <span className="logo-sm">
                  <img src={logo} alt="" height="22" />
                </span>
                <span className="logo-lg">
                  <img src={logoDark} alt="" height="17" />
                </span> */}
              </Link>

              <Link to="/" className="logo logo-light">
                <span className="logo-sm">
                  <img src={logo} alt="" height="22" />
                </span>
                <span className="logo-lg">
                  <img src={logoDark} alt="" height="37" />
                </span>
              </Link>
            </div>
          </div>
          <div className="d-flex">
            <div className="dropdown d-none d-lg-inline-block">
              <button
                type="button"
                onClick={toggleFullscreen}
                className="btn header-item noti-icon waves-effect"
                data-toggle="fullscreen"
              >
                <i className="mdi mdi-fullscreen font-size-24"></i>
              </button>
            </div>
            {/* <ProfileMenu /> */}
            <div
              onClick={() => {
                // Assuming you have a state in a parent component or context to handle the sidebar visibility
                // If not, you can manage it with local state here if needed
              }}
              className="dropdown d-inline-block"
            >
              {/* <button
                type="button"
                className="btn header-item noti-icon right-bar-toggle waves-effect"
              >
                <i className="mdi mdi-spin mdi-cog"></i>
              </button> */}
            </div>
          </div>
        </div>
      </header>
    </React.Fragment>
  )
}

Header.propTypes = {
  t: PropTypes.any,
}

export default withTranslation()(Header)
