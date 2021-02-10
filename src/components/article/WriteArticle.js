import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createArticle2 } from '../../actions/articleActions';
import Swal from "sweetalert2";

class WriteArticle extends Component {
    state = {
        title: '',
        content: '',
    };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    submitArticle = () => {
        const { title, content } = this.state;
        const article = {
            title,
            content,
            id: this.props.user.id,
        }

        if (title === "" || content === ""){
            Swal.fire({
                icon: 'warning',
                title: 'Some fields are empty, check again',
                showConfirmButton: false,
                timer: 2000
            })

        }

        else if (article.id !== ""){
            this.props.createArticle2(article);

            Swal.fire({
                icon: 'success',
                title: 'Your article has been created',
                showConfirmButton: false,
                timer: 2500,
                onClose: () => {
                    this.props.history.push("/");
                }
            })
        }
    
    }
    render() {
        return (
            <div className="container">
                <form>
                    <label htmlFor="title">Title:</label>
                    <input onChange={this.onChange} type="text" className="form-control mb-3" name="title" placeholder="Title" value={this.state.title}></input>
                
                    <label htmlFor="content">Content:</label>
                    <textarea onChange={this.onChange} className="form-control mb-3" name="content" placeholder="Content" rows="5" value={this.state.content}></textarea>
     
                    <br></br>
                    <input type="hidden" value={this.props.user !== null && this.props.user.id} name="id"></input>
                    <input type="hidden" value="" name="category"></input>

                    <button type="button" onClick={this.submitArticle} className="btn btn-primary">Submit article</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.auth.user
  });

export default connect(mapStateToProps, {createArticle2})(WriteArticle);