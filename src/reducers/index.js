import { combineReducers } from "redux";
import  articelsReducer  from "./articlesReducer";
import  authorsReducer  from "./authorsReducer";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
  articles: articelsReducer,
  authors: authorsReducer,
  auth: authReducer,
  error: errorReducer
});
