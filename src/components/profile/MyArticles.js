import React, { Component } from 'react'
import { getItemsByAuthor, deleteArticle, getItems } from '../../actions/articleActions';

import { connect } from 'react-redux'
import Article from '../article/Article';

class MyArticles extends Component {
    componentDidMount(){
        let id = this.props.match.params.id;
        this.props.getItemsByAuthor(id);
    }


    render() {
        let { articles } = this.props.articles;
        return (
            <div className="container">
               {articles.length > 0 && articles.map(article => <Article key={article.id} article={article} ownership={true} deleteArticle={this.props.deleteArticle}/>)}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    articles: state.articles
  })
export default connect(mapStateToProps, {getItems, getItemsByAuthor, deleteArticle})(MyArticles)
