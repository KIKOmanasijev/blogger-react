import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getArticlesByCategory } from "../../actions/articleActions";

class CategoryList extends Component {
    categoryHandle = (e) => {
        this.props.getArticlesByCategory(e.target.value);
    }
    render() {
        return (
            <div className="categoryList">
                <h2 className="my-3">Categories</h2>

                <button className="btn btn-dark mt-1 mr-1" value="UX" onClick={this.categoryHandle}>User Experience</button>
                <button className="btn btn-dark mt-1" value="UI" onClick={this.categoryHandle}>UI Design</button>
                <button className="btn btn-dark mt-1 mr-1" value="WD" onClick={this.categoryHandle}>Web Design</button>
                <button className="btn btn-dark mt-1" value="WB" onClick={this.categoryHandle}>Web Dev</button>
                <button className="btn btn-dark mt-1 mr-1" value="INT" onClick={this.categoryHandle}>Interview</button>
                <button className="btn btn-dark mt-1" value="TAT" onClick={this.categoryHandle}>Tutorials</button>
                <button className="btn btn-dark mt-1 mr-1" value="INSP" onClick={this.categoryHandle}>Inspiration</button>
                <button className="btn btn-dark mt-1 " value="CA" onClick={this.categoryHandle}>Career Advice</button>
                <button className="btn btn-dark mt-1" value="JS" onClick={this.categoryHandle}>Javascript</button>
                <button className="btn btn-dark mt-1" value="PROG" onClick={this.categoryHandle}>General Programming</button>
            </div>
        )
    }
}

export default connect(null, {getArticlesByCategory})(CategoryList);