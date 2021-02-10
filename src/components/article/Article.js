import React, { Component, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import {
  getItemsByAuthor,
  deleteArticle,
  getItems,
} from "../../actions/articleActions";
import { connect } from "react-redux";
import Swal from "sweetalert2";

class Article extends Component {
  constructor(props) {
    super(props);
    this.deleteThisArticle = this.deleteThisArticle.bind(this);
  }

  deleteThisArticle(id) {
    Swal.fire({
      icon: "warning",
      title: "Article is about to be deleten",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.value) {
        this.props.deleteArticle(id);
        this.props.getItemsByAuthor(JSON.parse(localStorage.getItem("user")).id);
        
        return <Redirect to='/' />;
      }
    });
  }
  render() {
    let { title, body, creator, imageUrl, id } = this.props.article;
    return (
      <div className="singleArticle mb-5">
        {this.props.article && (
          <Fragment>
            <img
              className="img-rounded"
              src={imageUrl != null ? imageUrl : "/logo192.png"}
              alt="post thumbnail"
            />
            <div>
              {this.props.user && (
                <Link to={`/articles/${id}`}>
                  <h2>{title}</h2>
                  {body && (
                    <p>
                      {body.substring(0, 150)}
                      {body.length > 150 && "..."}
                    </p>
                  )}
                </Link>
              )}

              {!this.props.user && (
                <div>
                  <h2>{title}</h2>
                  {body && (
                    <p>
                      {body.substring(0, 150)}
                      {body.length > 150 && "..."}
                    </p>
                  )}
                </div>
              )}

              {this.props.ownership && (
                <Fragment>
                  <Link to={`/edit/${id}`}>
                    <button className="btn btn-primary mr-2">Edit</button>
                  </Link>
                  <button
                    onClick={() => {
                      this.deleteThisArticle(id);
                    }}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </Fragment>
              )}
              {!this.props.ownership && (
                <p className="singleArticleAuthorName">
                  Author: {creator != null ? creator.email : "Unknown"}
                </p>
              )}
            </div>
          </Fragment>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  articles: state.articles,
  user: state.auth.user
});
export default connect(mapStateToProps, {
  getItems,
  getItemsByAuthor,
  deleteArticle,
})(Article);
