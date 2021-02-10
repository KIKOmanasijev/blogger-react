import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
  getArticle,
  editArticle,
  saveEdit,
} from "../../actions/articleActions";
import Swal from "sweetalert2";

class EditArticle extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.saveEdit = this.saveEdit.bind(this);
  }
  componentDidMount() {
    let id = this.props.match.params.id;
    this.props.getArticle(id);
  }

  handleChange(e) {
    let id = this.props.match.params.id;
    let title = document.getElementsByName("title")[0].value;
    let body = document.getElementsByName("body")[0].value;

    this.props.editArticle(id, {
      singleArticle: {
        title,
        body,
        id
      },
    });
  }

  saveEdit(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log(this.props.singleArticle);
    this.props.saveEdit(JSON.stringify(this.props.singleArticle));

    Swal.fire({
      icon: "success",
      title: "Your article has been saved",
      showConfirmButton: false,
      timer: 1500,
    });
  }

  render() {
    return (
      <div className="container editForm">
        {this.props.singleArticle && (
          <Fragment>
            <form>
              <label htmlFor="title">Title</label>
              <input
                onChange={this.handleChange}
                name="title"
                type="text"
                className="form-control mb-3"
                value={this.props.singleArticle.title}
              />

              <label htmlFor="body">Content:</label>
              <textarea
                onChange={this.handleChange}
                rows={5}
                name="body"
                type="textarea"
                className="form-control"
                value={this.props.singleArticle.body}
              />

              <button className="btn btn-primary mt-3" onClick={this.saveEdit}>
                Save
              </button>
            </form>
          </Fragment>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  singleArticle: state.articles.singleArticle,
});
export default connect(mapStateToProps, { getArticle, editArticle, saveEdit })(
  EditArticle
);
