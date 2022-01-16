import { PostActionsType } from './postTypes'
import { HttpService } from '../../common/HttpService';
import { urlConstant } from '../../common/UrlConst';
import { fetchPostsRequest, fetchPostsSuccess, fetchPostsFailure } from '../rootTypes';



export const resetPostEditObject = () => {
    return {
        type: PostActionsType.REST_POST_OBJECT,
    }
}

export const fetchPosts = () => {
    return (dispatch) => {
        dispatch(fetchPostsRequest)
        HttpService.get(urlConstant.postApiEndPoint)
            .then(res => {
                dispatch(fetchPostsSuccess(res))
            })
            .catch(err => {
                const errorMsg = err.message;
                dispatch(fetchPostsFailure(errorMsg))

            })
    }
}

export const addPost = (payload) => {
    return (dispatch) => {
        dispatch(fetchPostsRequest)
        HttpService.post(urlConstant.postApiEndPoint, payload)
            .then(res => {
                let data = res.data;
                dispatch({
                    type: PostActionsType.ADD_POST,
                    payload: data
                })
            })
            .catch(err => {
                const errorMsg = err.message;
                dispatch(fetchPostsFailure(errorMsg))

            })
    }
}

export const getPostbyId = (postId) => {
    const apiEndPoint = `${urlConstant.postApiEndPoint}/${postId}`;
    return (dispatch) => {
        dispatch(fetchPostsRequest)
        HttpService.get(apiEndPoint)
            .then(res => {
                const data = res.data;
                dispatch({
                    type: PostActionsType.GET_POST_BY_ID,
                    payload: data
                })
            })
            .catch(err => {
                const errorMsg = err.message;
                dispatch(fetchPostsFailure(errorMsg))

            })
    }
}

export const editPost = (payload) => {
    const { id: postId } = payload
    const apiEndPoint = `${urlConstant.postApiEndPoint}/${postId}`;
    return (dispatch) => {
        dispatch(fetchPostsRequest)
        HttpService.put(apiEndPoint, payload)
            .then(res => {
                dispatch({
                    type: PostActionsType.EDIT_POST,
                })
            })
            .catch(err => {
                const errorMsg = err.message;
                dispatch(fetchPostsFailure(errorMsg))

            })
    }
}


export const deletePostbyId = (id = 0) => {
    const apiEndPoint = `${urlConstant.postApiEndPoint}/${id}`;
    return (dispatch) => {
        dispatch(fetchPostsRequest)
        HttpService.deleteItem(apiEndPoint)
            .then(res => {
                dispatch({
                    type: PostActionsType.DELETE_POST,
                });
            })
            .catch(err => {
                const errorMsg = err.message;
                dispatch(fetchPostsFailure(errorMsg))

            })
    }
}
