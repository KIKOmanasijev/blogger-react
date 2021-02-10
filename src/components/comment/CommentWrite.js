import React, { Component, Fragment } from 'react'
import Swal from 'sweetalert2';
import store from '../../store';
import { connect } from 'react-redux';
import { writeComment, getArticle } from "../../actions/articleActions";


class CommentWrite extends Component {
    constructor(props){
        super(props);

        let user = JSON.parse(localStorage.getItem("user"));
        
        if (user !== null){
            this.state = {
                authorId: user.id,
                postId: this.props.id,
                content: ""
            }
        }
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    onSubmit = () => {
        let { authorId, postId, content } = this.state;
        const data = {
            authorId,
            postId,
            content
        }

        if (content !== ""){
            this.props.writeComment(data);
            this.setState({
                content: ""
            });
            
            Swal.fire({
                icon: "success",
                title: "Comment sent successfully",   
                showConfirmButton: false,
                timer: 1500,
                // onClose: () => {
                //     window.location.reload()
                // }
              })
        } else {
            Swal.fire({
                icon: "warning",
                title: "You can not leave an empty comment!",   
                showConfirmButton: false,
                timer: 1500
              })
        }
    }

    render() {
        let auth = store.getState().auth.isAuth;
        return ( 
            <Fragment>
                { auth && (
                    <div className="commentWrite">
                    <form>
                        <textarea type="text" onChange={this.onChange} name="content" value={this.state.content} placeholder="Comment..." className="form-control mb-2 commentInput"/>
                        <input type="hidden" name="articleId" value={this.state.articleId}></input>
                        <input type="hidden" name="authorId" value={this.state.authorId}></input>
                        <button onClick={this.onSubmit} type="button" className="commentButton btn btn-primary">Write comment</button>
                    </form>
                </div>
                )}
            </Fragment>
        )
    }
}

export default connect(null, {writeComment, getArticle})(CommentWrite);