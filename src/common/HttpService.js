import axios from 'axios';

const access_token = '6924c3ffaa24b3b4f9f14be46203945776ef8375216af08f8c3e6ea66893544c';
const baseUrl = 'https://gorest.co.in/public/v1/';
let CancelToken = axios.CancelToken;
let cancel;

axios.interceptors.request.use((config) => {
    const _token = access_token;
    if (_token) {
        config.headers.Authorization = 'Bearer ' + _token;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

axios.interceptors.response.use((response) => {
    return response;
}, (error) => {

    let errorValue;
    if (error.response && error.response.data && error.response.data.error &&
        (error.response.data.session === false || error.response.data.session === "false")) {
        // window.location = "/";
    }
    else if (error.response && Number(error.response.status) === 401) {
        // window.location = "/"
    } else {
        errorValue = error;
    }

    return Promise.reject(errorValue);
});

const post = (apiUrl, payload) => {
    var url = baseUrl + apiUrl;
    return axios(url, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        data: payload,
    })
        .then(response => response.data)
        .catch(error => {
            throw error;
        });
};

const put = (apiUrl, payload) => {
    var url = baseUrl + apiUrl;
    return axios(url, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
        },
        data: payload,
    })
        .then(response => response.data)
        .catch(error => {
            throw error;
        });
};

const get = (apiUrl) => {
    var url = baseUrl + apiUrl;
    return axios(url, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        }
    })
        .then(response => response.data)
        .catch(error => {
            throw error;
        });
}
const deleteItem = (apiUrl, payload = {}) => {

    var url = baseUrl + apiUrl;
    return axios(url, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json',
        },
        data: payload,
    })
        .then(response => response.data)
        .catch(error => {
            throw error;
        });
}
const getListBySearch = (apiUrl) => {
    var url = baseUrl + apiUrl;
    if (cancel !== undefined) cancel();
    return axios(url, {
        method: 'GET',
        cancelToken: new CancelToken(c => cancel = c),
        headers: {
            'content-type': 'application/json',
        }
    }).then(response => response.data)
        .catch(error => {
            throw error;
        });
}



export const HttpService = {
    post, get, put, deleteItem, getListBySearch,
}