import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Register from "../auth/Register";
import Login from "../auth/Login";
import Logout from "../auth/Logout";
import { connect } from "react-redux";
class Header extends Component {
  render() {
    const { isAuth, user } = this.props.auth;

    const AuthLinks = (
      <Fragment>
        <strong className="nav-link">{user && `Welcome ${user}`}</strong>
        <Logout />
      </Fragment>
    );

    const GuestLinks = (
      <Fragment>
        <Register />
        <Login />
      </Fragment>
    );
    return (
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container">
          <Link to="/" className="navbar-brand">
            MODEUM
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item mr-2">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              {isAuth && (
                <Fragment>
                  <li className="nav-item mr-2">
                    <Link
                      to={`/profile/${user.id}/articles`}
                      className="nav-link"
                    >
                      My Articles
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/writeArticle" className="nav-link">
                      Write Article
                    </Link>
                  </li>
                </Fragment>
              )}
            </ul>
          </div>
          <div className="ml-auto d-flex">
            {isAuth ? AuthLinks : GuestLinks}
          </div>
        </div>
      </nav>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(Header);
