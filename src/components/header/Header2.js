import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Register from "../auth/Register";
import Login from "../auth/Login";
import { Navbar, Nav, Container } from "react-bootstrap";
import { getItems } from "../../actions/articleActions";
import Logout from "../auth/Logout";
import "bootstrap/dist/css/bootstrap.min.css";

import { connect } from "react-redux";
class Header extends Component {
  render() {
    const { isAuth, user } = this.props.auth;
    
    const AuthLinks = (
      <Fragment>
        <strong className="nav-link mr-2">
          {user && `Welcome ${user.email}`}
        </strong>
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
      <Navbar collapseOnSelect expand="lg">
        <Container>
          <Navbar.Brand>
            <Link to="/" onClick={this.props.getItems}>MODEUM</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              {user && (
                <Fragment>
                  <Link
                    to={`/profile/${user.id}/articles`}
                    className="nav-link"
                  >
                    My Articles
                  </Link>
                  <Link to="/writeArticle" className="nav-link">
                    Write Article
                  </Link>
                </Fragment>
              )}
            </Nav>
            <Nav>
              <div className="ml-auto d-flex">
                {isAuth ? AuthLinks : GuestLinks}
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {getItems})(Header);
