import {
  GET_ARTICLES,
  GET_ARTICLE,
  CREATE_ARTICLE,
  GET_ARTICLES_BY_AUTHOR,
  GET_ARTICLES_BY_CATEGORY,
  EDIT_ARTICLE,
  DELETE_ARTICLE,
  WRITE_COMMENT
} from "./types";
import repo from "../repository/axiosRepository";
import axios from 'axios';

export const getItems = () => {
  return async function (dispatch) {
    let articles = await repo.fetchArticles();
    dispatch({
      type: GET_ARTICLES,
      payload: articles.data.content,
    });
  };
};

export const getArticle = id => {
  return function(dispatch) {
    return repo.fetchArticle(id).then(resp => {
      dispatch({
        type: GET_ARTICLE,
        payload: resp.data
      });
    }).catch(e => {
      throw 'Subscription Limit reached';
    });
  };
};

export const getItemsByAuthor = id => {
  return function(dispatch) {
    return repo.getArticlesByAuthor().then(resp => {
      dispatch({
        type: GET_ARTICLES_BY_AUTHOR,
        payload: resp.data.content
      });
    });
  };
};

export const editArticle = (id, obj) => {
  return function(dispatch) {
    dispatch({
      type: EDIT_ARTICLE,
      payload: obj
    });
  };
};

export const saveEdit = (id, article) => {
  repo.saveArticle(id, article).then(resp => {
    
  }).catch(err => console.log(err, "err"));
  return function(dispatch) {
    dispatch({
      type: EDIT_ARTICLE,
      payload: article
    });
  };
};

export const deleteArticle = (id) => {
  return function(dispatch) {
    repo.deleteArticle(id).then(
      resp => {
        dispatch({
          type: DELETE_ARTICLE
        })
       getItems();
      }
    );
    
  };
};

//CREATE_ARTICLE
export const createArticle = (article) => {
  return function(dispatch) {
    repo.createArticle(article).then(
      resp => {
        dispatch({
          type: CREATE_ARTICLE,
          payload: resp.data
        })
      }
    );
    
  };
};

//CREATE ARTICLE 2
export const createArticle2 = (article) => (dispatch) => {

  return axios.post(`http://localhost:8080/api/articles/create`, {
    title: article.title,
    body: article.content
  }, {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("jwt")}`,
      "Content-Type": "application/json",
    },
  });
}


export const writeComment = (article) => {
  return function(dispatch) {
    repo.postComment(article).then(
      resp => {
        dispatch({
          type: WRITE_COMMENT,
          payload: resp.data
        })
      }
    );
    
  };
};

export const getArticlesByCategory = (category) => {
  return function(dispatch) {
    repo.getArticlesByCategory(category).then(
      resp => {
        dispatch({
          type: GET_ARTICLES_BY_CATEGORY,
          payload: resp.data
        })
      }
    );
    
  };
}