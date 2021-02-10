import { WRITE_COMMENT, GET_ARTICLES, GET_ARTICLE, GET_ARTICLES_BY_AUTHOR, EDIT_ARTICLE, DELETE_ARTICLE, GET_ARTICLES_BY_CATEGORY } from "../actions/types";

const InitialState = {
  articles: [{id: 1, title: "initial", content: "initial"}],
  singleArticle: {}
};


export default function(state = InitialState, action) {
  switch (action.type) {  
    case GET_ARTICLES:
      return {
        ...state,
        articles: action.payload
      }
    case GET_ARTICLE:
      return {
        ...state,
        singleArticle: action.payload
      }
    case GET_ARTICLES_BY_AUTHOR:
      return {
        ...state,
        articles: action.payload
      }
    case EDIT_ARTICLE:
      return {
        ...state,
        ...action.payload
      }
    case DELETE_ARTICLE:
      return {
        ...state
      }
    case WRITE_COMMENT:
      return {
        ...state,
        singleArticle: action.payload 
      }
    case GET_ARTICLES_BY_CATEGORY:
      return {
        ...state,
        articles: action.payload
      }
    default:
      return state;
  }
}
