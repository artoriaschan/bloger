import http from './http'
const querystring = require('querystring')
export const login = props => {
    return http.post('/api/login',querystring.stringify(props),
        {
            headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',}
        }
    );
};
export const register = props => {
    return http.post('/api/register',querystring.stringify(props),
        {
            headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',}
        }
    );
};
export const getCurrentUser = () => {
    return http.get('/api/current/user');
};
export const getArticleDetail = (articleId) => {
    return http.get('/api/article/' + articleId);
};