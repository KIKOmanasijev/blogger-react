import React, { Component, Fragment } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./header/Header2";
import HomePage from "./home/HomePage";
import ArticleSinglePage from "./article/ArticleSinglePage";
import { Route, Redirect } from "react-router-dom";
import { loginWithStorage } from "../actions/authActions";
import MyArticles from "./profile/MyArticles";
// import ErrorAlert from './info/ErrorAlert';
import { connect } from "react-redux";
import EditArticle from "./article/EditArticle";
import WriteArticle from "./article/WriteArticle";
import store from '../store';

class App extends Component {
  componentDidMount() {
    // if (localStorage.getItem("user") !== null) {
    //   const user = JSON.parse(localStorage.getItem("user"));
    //   this.props.loginWithStorage(user);
    // }
  }

  render() {
    let auth = store.getState().auth.isAuth;
    return (
      <Fragment>
        <Header />
        <Route path="/" exact={true} component={HomePage} />
        <Route path="/articles/:id" component={ArticleSinglePage} />
        <ProtectedRoute auth={auth} path="/profile/:id/articles" component={MyArticles} />
        <ProtectedRoute auth={auth} path="/edit/:id/" component={EditArticle} />
        <ProtectedRoute auth={auth} path="/writeArticle" component={WriteArticle} />
      </Fragment>
    );
  }
}

const ProtectedRoute = ({auth, component:Component, ...rest}) => {
  return (
    <Route {...rest}
    render = { props => auth ? (<Component {...props}/>) : <Redirect to="/"/>} />
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { loginWithStorage })(App);
