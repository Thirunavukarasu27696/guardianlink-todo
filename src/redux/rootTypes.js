
const FETCH_POST_REQUEST = 'FETCH_POST_REQUEST';
const FETCH_POST_SUCCESS = 'FETCH_POST_SUCCESS';
const FETCH_POST_FAILURE = 'FETCH_POST_FAILURE';

export const fetchPostsRequest = () => {
    return {
        type: FETCH_POST_REQUEST
    }
}

export const fetchPostsSuccess = (posts) => {
    return {
        type: FETCH_POST_SUCCESS,
        payload: posts
    }
}
export const fetchPostsFailure = (error) => {
    return {
        type: FETCH_POST_FAILURE,
        error: error
    }
}

export const RootActionType = {
    FETCH_POST_REQUEST, FETCH_POST_FAILURE, FETCH_POST_SUCCESS
}