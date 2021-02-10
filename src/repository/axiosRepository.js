import axios from './custom-axios'
// import qs from 'qs'

const articleService = {
    fetchArticles: ()=> {
        return axios.get("/api/articles");
    },

    fetchArticle: (id)=> {
        return axios.get(`/api/users/view/${id}`);
    },

    login: (user) => {
        console.log(user);
        return axios.post(`/api/auth/authenticate`, user);
    },

    getArticlesByAuthor: (id) => {
        const jwt = localStorage.getItem("jwt");
        
        if (jwt){
            const config = {
                headers: {
                    'Authorization':`Bearer ${jwt}`
                }
            }
            return axios.get(`/api/articles/current-user`, config);
        }
    },

    saveArticle: (article) => {
        return axios.patch(`/api/articles`, article);
    },

    deleteArticle: (id) => {
        return axios.delete(`/api/articles/${id}`);
    },

    createArticle: (article) => {
        return axios.post(`/api/articles`, article);
    },

    postComment: (comment) => {
        var config = {
            params: {
                postId: comment.postId,
                authorId: comment.authorId,
                content: comment.content
            }
        }
        return axios.post(`/api/comment`, comment, config);
    },

    getArticlesByCategory: (category) => {
        return axios.get(`/api/category/${category}`);
    }
}

export default articleService;
