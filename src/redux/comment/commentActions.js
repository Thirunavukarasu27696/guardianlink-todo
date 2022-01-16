import { commentActionsType } from './commentTypes'
import { HttpService } from '../../common/HttpService';
import { urlConstant } from '../../common/UrlConst';
import { fetchPostsRequest, fetchPostsSuccess, fetchPostsFailure } from '../rootTypes';


export const resetCommentObject = () => {
    return {
        type: commentActionsType.REST_COMMENT_OBJECT,
    }
}

export const fetchComments = () => {
    return (dispatch) => {
        dispatch(fetchPostsRequest)
        HttpService.get(urlConstant.commentApiEndPoint)
            .then(res => {
                dispatch(fetchPostsSuccess(res))
            })
            .catch(err => {
                const errorMsg = err.message;
                dispatch(fetchPostsFailure(errorMsg))

            })
    }
}

export const addComment = (payload) => {
    return (dispatch) => {
        dispatch(fetchPostsRequest)
        HttpService.post(urlConstant.commentApiEndPoint, payload)
            .then(res => {
                const data = res.data;
                dispatch({
                    type: commentActionsType.ADD_COMMENT,
                    payload: data
                })
            })
            .catch(err => {
                const errorMsg = err.message;
                dispatch(fetchPostsFailure(errorMsg))

            })
    }
}

export const getCommentItembyId = (id) => {
    const apiEndPoint = `${urlConstant.commentApiEndPoint}/${id}`;
    return (dispatch) => {
        dispatch(fetchPostsRequest)
        HttpService.get(apiEndPoint)
            .then(res => {
                const data = res.data;
                dispatch({
                    type: commentActionsType.GET_COMMENT_BY_ID,
                    payload: data
                })
            })
            .catch(err => {
                const errorMsg = err.message;
                dispatch(fetchPostsFailure(errorMsg))

            })
    }
}

export const editComment = (payload) => {
    const { id } = payload
    const apiEndPoint = `${urlConstant.commentApiEndPoint}/${id}`;
    return (dispatch) => {
        dispatch(fetchPostsRequest)
        HttpService.put(apiEndPoint, payload)
            .then(res => {
                dispatch({
                    type: commentActionsType.EDIT_COMMENT,
                })
            })
            .catch(err => {
                const errorMsg = err.message;
                dispatch(fetchPostsFailure(errorMsg))

            })
    }
}


export const deleteCommentItembyId = (Id = 0) => {
    const apiEndPoint = `${urlConstant.commentApiEndPoint}/${Id}`;
    return (dispatch) => {
        dispatch(fetchPostsRequest)
        HttpService.deleteItem(apiEndPoint)
            .then(res => {
                dispatch({
                    type: commentActionsType.DELETE_COMMENT,
                });
            })
            .catch(err => {
                const errorMsg = err.message;
                dispatch(fetchPostsFailure(errorMsg))

            })
    }
}
