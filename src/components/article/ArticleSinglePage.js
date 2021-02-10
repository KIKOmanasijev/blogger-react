import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { getArticle } from '../../actions/articleActions';
import repo from '../../repository/axiosRepository';
import Comment from "../comment/Comment";
import CommentWrite from '../comment/CommentWrite';


class ArticleSinglePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: ""
        };
    }
    componentDidMount(){
        this.id = this.props.match.params.id;
        this.props.getArticle(this.id).catch(e => {
            console.log(e);
            this.setState({
                error: e
            })
        });
      
    }
    
    submitComment = (data) => {
        repo.postComment(data);
        this.props.getArticle(this.id);
    }

    render() {
        let { singleArticle: article } = this.props;
        console.log(this.state.error);
        return (
          <Fragment>
            {article !== undefined && article.creator !== undefined && this.state.error == "" && (
              <div className="container articleContainer">
                <h1 className="singleArticleTitle">{article.title}</h1>

                {/* <img src={article.imageUrl} className="singlePageThumbnail" alt="article main thumb"/> */}
                <p>{article.body}</p>
                <div className="authorDetails">
                  <div>
                    <p>Posted by: {article.creator.email}</p>
                  </div>
                </div>

                <p className="singleArticleParagraph">{article.content}</p>

                <div className="comments">
                  {/* <h3>Comments:   </h3>
                            {
                                comments.map((comment) => (
                                    <Comment key={comment.id} content={comment.content} author={comment.author}/>
                                ))
                            } */}
                  <CommentWrite
                    submitComment={this.submitComment}
                    id={article.id}
                  />
                </div>
              </div>
            )}

            {this.state.error != "" && (
              <div className="container">
                <div className="alert alert-danger" role="alert">
                  Subscription Limit Reached!!!
                </div>
              </div>
            )}
          </Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    singleArticle: state.articles.singleArticle
})

export default connect(mapStateToProps, {getArticle})(ArticleSinglePage);