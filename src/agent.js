import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = 'https://conduit.productionready.io/api';

const responseBody = res => res.body;
let token = null;

const tokenPlugin = req => {
    if(token){
        req.set('authorization', `Token ${token}`);
    }
}

const request = {
    get: url =>
        superagent.get(`${API_ROOT}${url}`).then(responseBody),
    post: (url, body) => 
        superagent.post(`${API_ROOT}${url}`, body)
        .then(responseBody),
    put: (url, body) =>
        superagent.put(`${API_ROOT}${url}`, body)
        .then(responseBody)
};

const Articles = {
    all: page =>
        request.get('/articles?limit=10'),
    get: slug =>
        request.get(`/articles/${slug}`)
};

const Comments = {
    forArticles: slug => 
        request.get(`/articles/${slug}/comments`)
}

const Auth = {
    current: () =>
        request.get('/user'),
    login: (email, password) => 
        request.post('/users/login', { user: { email, password } }),
    register: (username, email, password) =>
        request.post('/users', { user: { username, email, password}}),
    save: user =>
        request.put('/user', { user })

};

export default {
    Articles,
    Auth,
    Comments,
    setToken: _token => { token = _token; }
};