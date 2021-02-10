import React, { Component } from "react";

export default class ErrorAlert extends Component {
  render() {
    return (
      <div class="alert alert-block">
        <button type="button" class="close" data-dismiss="alert">
          &times;
        </button>
        <h4>Warning!</h4>
       No articlce found
      </div>
    );
  }
}
