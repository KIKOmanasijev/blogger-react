import React, { Component } from 'react'

export default class Comment extends Component {
    render() {
        return (
            <div className="row mb-2">
                <div className="col-md-1">
                    <img className="commentImg" alt="Author thumbnail" src={this.props.author.imageUrl}></img>
                </div>
                <div className="col-md-11">
                    <p className="commentAuthor">{this.props.author.fullName}</p>
                    <p className="commentContent">{this.props.content}</p>
                </div>
            </div>
        )
    }
}
