import React, { Component } from "react";
import Article from "../article/Article";

import { connect } from "react-redux";
import { getItems } from "../../actions/articleActions";
import CategoryList from "../category/CategoryList";

class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    await this.props.getItems();
  }

  render() {
    let { articles } = this.props.articles;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 mt-3">
            {articles &&
              articles.map((article) => (
                <Article key={article.id} article={article} />
              ))}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  articles: state.articles,
});
export default connect(mapStateToProps, { getItems })(HomePage);
